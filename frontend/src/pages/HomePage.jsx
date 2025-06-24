import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOutgoingFriendReqs,
  getRecomendedUsers,
  getUsersFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { CheckCircleIcon, UserPlusIcon } from "lucide-react";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingReqIds, setOutgoingReqIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUsersFriends,
  });

  const { data: recomendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecomendedUsers,
  });

  const { data: outgoingFriendReqs = [] } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();

    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingReqIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);
  

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Your Friends
        </h2>
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols3 xl:grid-cols-4 gap-4">
            {friends.map((friends) => (
              <FriendCard key={friends._id} friend={friends} />
            ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Meet New People
              </h2>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : recomendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recomendations available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new friends
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recomendedUsers.map((user) => {
                const hasReqBeenSent = outgoingReqIds.has(user._id);

                return (
                  <div key={user._id}>
                    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden">
                      <div className="card-body p-5 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-16 h-16 rounded-full">
                              <img
                                src={
                                  user.profilePicture || "/defaultAvatar.jpg"
                                }
                                alt={user.username}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {user.username}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {user.bio || "No bio available"}
                            </p>
                          </div>
                        </div>
                        <div className="pt-2 text-end">
                          <button
                            className={`btn btn-sm w-full ${
                              hasReqBeenSent ? "btn-disabled" : "btn-primary"
                            }`}
                            disabled={hasReqBeenSent || isPending}
                            onClick={() => sendRequestMutation(user._id)}
                          >
                            {hasReqBeenSent ? (
                              <>
                                <CheckCircleIcon className="size-4 mr-2" />
                                Requested
                              </>
                            ) : (
                              <>
                                <UserPlusIcon className="size-4 mr-2" />
                                Add Friend
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
