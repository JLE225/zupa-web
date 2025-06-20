import React, { useState } from "react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api.js";
import BackgroundParent from "../components/BackgroundParent";
import CustomInput from "../components/CustomInput";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Login successful!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <BackgroundParent className="flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-primary/25 bg-base-100/50 backdrop-blur-2xl flex flex-col w-full max-w-xl mx-auto rounded-xl shadow-lg overflow-hidden">
        <div className="w-full p-4 sm:p-8 flex flex-col">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Welcome Back</h2>
              <p className="text-md opacity-70">Log in to your Zupa account</p>
            </div>
            <div className="space-y-3">
              <div className="form-control w-full">
                <CustomInput
                  label="Email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>
              <div className="form-control w-full">
                <CustomInput
                  label="Password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>
              {error && (
                <div className="alert alert-error mb-4">
                  <span>{error.response?.data?.message || "Login failed"}</span>
                </div>
              )}

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
                  "Login"
                )}
              </button>
              <p className="text-sm text-center text-white/80">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </BackgroundParent>
  );
};

export default LoginPage;
