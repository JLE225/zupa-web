import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getRecomendedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs,
  uploadPicture
} from "../controllers/user.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecomendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

router.post(
  "/upload-picture",
  upload.single("image"),
  uploadPicture
);

export default router;
