import React from "react";
import { MessageCircleIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden">
      <div className="card-body p-5 space-y-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full">
              <img
                src={friend?.profilePicture || "/defaultAvatar.jpg"}
                alt={friend?.username}
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{friend?.username}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {friend?.bio || "No bio available"}
            </p>
          </div>
        </div>
        <div className="pt-2 text-end space-y-3">
          <Link
            to={`/messages/${friend?._id}`}
            className="btn btn-sm btn-primary w-full"
            title="Send Message"
          >
            <MessageCircleIcon className="size-4" />
            <span className="ml-1">Message</span>
          </Link>
          <Link
            to={`/profile/${friend?._id}`}
            className="btn btn-sm btn-outline w-full"
            title="View Profile"
          >
            <UserIcon className="size-4" />
            <span className="ml-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
