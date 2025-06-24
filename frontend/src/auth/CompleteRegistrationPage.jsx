import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser.js";
import toast from "react-hot-toast";
import { completeRegistration } from "../lib/api.js";
import BackgroundParent from "../components/BackgroundParent.jsx";
import { CameraIcon, ShipWheelIcon, LoaderIcon } from "lucide-react";
import { useState } from "react";
import CustomInput from "../components/CustomInput.jsx";
import CustomTextarea from "../components/CustomTextarea.jsx";

const CompleteRegistrationPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    username: authUser?.username || "",
    bio: authUser?.bio || "",
    profilePicture: authUser?.profilePicture || "",
    bannerPicture: authUser?.bannerPicture || "",
  });

  const { mutate: completeRegistrationMutation, isPending } = useMutation({
    mutationFn: completeRegistration,
    onSuccess: () => {
      toast.success(
        "You're all set, Zupa 🌌 Let's explore the galaxy of connections."
      );
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    completeRegistrationMutation(formState);
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

              <div className="form-control w-full">
                <CustomInput
                  label="Username"
                  name="username"
                  value={formState.username}
                  disabled
                />
              </div>
              <div className="form-control w-full">
                <CustomTextarea
                  label="Bio"
                  name="bio"
                  value={formState.bio}
                  onChange={(e) =>
                    setFormState({ ...formState, bio: e.target.value })
                  }
                />
              </div>
              <button
                className="btn btn-primary w-full"
                disabled={isPending}
                type="submit"
              >
                {!isPending ? (
                  <>
                    <ShipWheelIcon className="size-5 mr-2" />
                    Complete Registration
                  </>
                ) : (
                  <>
                    <LoaderIcon className="size-5 mr-2 animate-spin" />
                    Loading...
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </BackgroundParent>
  );
};

export default CompleteRegistrationPage;
