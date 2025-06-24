import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { NavLink, useLocation } from "react-router";
import {
  HomeIcon,
  UsersIcon,
  MessageCircleIcon,
  Orbit,
  LogOutIcon,
  Bell,
  Settings,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const loc = useLocation();
  const currentPath = loc.pathname;
  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const navItems = [
    { to: "/", icon: HomeIcon },
    { to: "/friends", icon: UsersIcon },
    { to: "/messages", icon: MessageCircleIcon },
    { to: "/notifications", icon: Bell },
  ];

  return (
    <div className="w-24 bg-base-200 border-r border-base-300 flex flex-col justify-between h-screen sticky top-0 z-10">
      {/* Top: Logo + Nav */}
      <div>
        <div className="p-5 border-b border-base-300">
          <NavLink to="/" className="flex items-center justify-center">
            <Orbit className="size-9 text-primary hover:rotate-[18deg] transition-transform duration-200" />
          </NavLink>
        </div>

        <nav className="flex flex-col items-center py-6 space-y-4">
          {navItems.map(({ to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `btn btn-ghost btn-circle transition-all ${
                  isActive
                    ? "bg-primary/30 text-white scale-110 shadow"
                    : "hover:bg-base-300"
                }`
              }
            >
              <Icon className="size-5" />
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom: Profile */}
      <div className="p-4 border-t border-base-300 flex justify-center">
        <div className="dropdown dropdown-top">
          <div
            tabIndex={0}
            role="button"
            className="flex flex-col items-center gap-1 cursor-pointer relative"
          >
            {/* Avatar */}
            <div className="relative group">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-base-content/20 shadow-md group-hover:shadow-lg transition-all">
                <img
                  src={authUser?.profilePicture || "/defaultAvatar.jpg"}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online badge */}
              <span className="absolute top-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-200" />
            </div>

            {/* Username */}
            <p className="text-xs font-medium text-center truncate max-w-[5rem]">
              {authUser?.username}
            </p>
          </div>

          {/* Dropdown */}
          <ul
            tabIndex={0}
            className="dropdown-content z-50 menu p-2 shadow-lg bg-base-100 border border-base-300 rounded-box w-48 translate-y-2 animate-fade-in"
          >
            <li>
              <NavLink to="/profile" className="text-sm">
                <Settings className="size-4" />
                Profile Settings
              </NavLink>
            </li>
            <li>
              <button
                onClick={logoutMutation}
                className="text-sm text-red-500 flex items-center gap-2"
              >
                <LogOutIcon className="size-4" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
