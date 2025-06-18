import React, { useState } from "react";
import { Orbit } from "lucide-react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { register } from "../lib/api";
import CustomInput from "../components/CustomInput";
import BackgroundParent from "../components/BackgroundParent";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: registerMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleRegister = (e) => {
    e.preventDefault();
    registerMutation(registerData);
  };

  return (
    <BackgroundParent className="flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-primary/25 bg-base-100/50 backdrop-blur-2xl flex flex-col lg:flex-row w-full max-w-xl mx-auto rounded-xl shadow-lg overflow-hidden">
        <div className="w-full p-4 sm:p-8 flex flex-col">
          <div className="w-full">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="text-center">
                <h2 className="text-3xl font-bold">Create Your Account</h2>
                <p className="text-md opacity-70">
                  Join and explore the galaxy of connections ✨
                </p>
              </div>
              <div className="space-y-3">
                <div className="form-control w-full">
                  <CustomInput
                    label="Username"
                    name="username"
                    value={registerData.username}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        username: e.target.value.replace(/\s/g, ""),
                      })
                    }
                  />
                </div>
                <div className="form-control w-full">
                  <CustomInput
                    label="Email"
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-control w-full">
                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                {error && (
                  <div className="alert alert-error mb-4">
                    <span>{error.response.data.message}</span>
                  </div>
                )}
                <p className="text-xs leading-snug text-wrap text-white/80">
                  By registering, you agree to Zupa's{" "}
                  <span className="text-primary hover:underline cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-primary hover:underline cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </p>

                <button
                  className="btn btn-primary w-full"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="loading loading-spinner loading-xs">
                      Loading...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <Link
                  to="/login"
                  className="text-primary text-sm hover:underline"
                >
                  Already have an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </BackgroundParent>
  );
};

export default RegisterPage;
