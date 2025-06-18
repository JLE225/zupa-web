import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api.js";
import BackgroundParent from "../components/BackgroundParent.jsx";
import { CameraIcon } from "lucide-react";
import { useState } from "react";

const OnBoardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    username: authUser?.fullName || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    profilePicture: authUser?.profilePicture || "",
    bannerPicture: authUser?.bannerPicture || "",
  });

  const { mutate: onBoardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success(
        "You're all set, Zupan 🌌 Let's explore the galaxy of connections."
      );
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardingMutation(formState);
  };

  return (
    <BackgroundParent className="flex items-center justify-center">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Registration
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePicture ? (
                  <img
                    src={formState.profilePicture}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/defaultAvatar.jpg"
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {}}
                  className="btn btn-accent"
                >
                  <CameraIcon className="size-4 mr-2" />
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BackgroundParent>
  );
};

export default OnBoardingPage;
