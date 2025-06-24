import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFriendRequests, acceptFriendRequest, declineFriendRequest } from "../lib/api";
import {
  BellIcon,
  ClockIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  UserCheckIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import NoNotification from "../components/NoNotification"

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const { mutate: declineRequestMutation, isPending: isDeclining } =
    useMutation({
      mutationFn: declineFriendRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      },
    });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Incoming Friend Requests
                  <span className="badge badge-primary ml-2">
                    {incomingRequests.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      className="card bg-base-200 shadow-md"
                      key={request._id}
                    >
                      <div className="card-body p-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          <div className="avatar size-10 rounded-full">
                            <img
                              className="w-10 h-10 object-cover rounded-full"
                              src={request.sender.profilePicture}
                              alt={request.sender.username}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-base">
                              {request.sender.username}
                            </h3>
                            <p className="text-sm my-1">
                              {request.sender.bio || "No bio available"}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => acceptRequestMutation(request._id)}
                              disabled={isPending}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={() =>
                                declineRequestMutation(request._id)
                              }
                              disabled={isDeclining}
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>
                <div className="space-y-3">
                  {acceptedRequests.map((notify) => (
                    <div
                      className="card bg-base-200 shadow-md"
                      key={notify._id}
                    >
                      <div className="card-body p-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          <div className="avatar size-10 rounded-full">
                            <img
                              className="w-10 h-10 object-cover rounded-full"
                              src={notify.recipient.profilePicture}
                              alt={notify.recipient.username}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-base">
                              {notify.recipient.username}
                            </h3>
                            <p className="text-sm my-1">
                              {notify.recipient.username} accepted your friend
                              request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              {formatDistanceToNow(new Date(notify.updatedAt), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                          <div className="btn btn-success whitespace-nowrap">
                            <MessageCircleIcon className="h-5 w-5 mr-1" />
                            Chat
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotification />
            )} 
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
