import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";
import streamifier from "streamifier";
import cloudinary from "../lib/cloudinary.js";

export async function getRecomendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recomendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { $id: { $nin: currentUser.friends } },
        { isOnBoarding: true },
      ],
    });

    res.status(200).json(recomendedUsers);
  } catch (error) {
    console.error("Error in getRecomendedUsers controller: ", error);
    res.status(500).json({ message: "Error getting recomended users" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate("friends", "username profilePicture bio");

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller: ", error);
    res.status(500).json({ message: "Error getting friends" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "User not found" });
    }

    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "You have already sent a friend request to this user",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest());
  } catch (error) {
    console.error("Error in sendFriendRequest controller: ", error);
    res.status(500).json({ message: "Error sending friend request" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Error accepting friend request" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "username, profilePicture, bio");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "username profilePicture");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "username profilePicture");

    res.status(200).json(outgoingReqs);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function uploadPicture(req, res) {
  try {
    const file = req.file;
    const { type } = req.body; // 'profile' atau 'banner'

    if (!file || !type) {
      return res.status(400).json({ message: "Missing file or type" });
    }

    const validTypes = ["profile", "banner"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid picture type" });
    }

    const result = await new Promise((resolve, reject) => {
      const cloudStream = cloudinary.uploader.upload_stream(
        {
          folder: type === "profile" ? "zupa_profile_pictures" : "zupa_banner_pictures",
          public_id: `${req.user.id}-${type}-${Date.now()}`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(cloudStream);
    });

    const updateField =
      type === "profile"
        ? { profilePicture: result.secure_url }
        : { bannerPicture: result.secure_url };

    const user = await User.findByIdAndUpdate(req.user.id, updateField, {
      new: true,
    });

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Upload error:", err); // Tambahkan log ini
    res
      .status(500)
      .json({ message: "Failed to upload picture", error: err.message });
  }
}
