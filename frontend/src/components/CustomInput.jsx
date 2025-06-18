import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const CustomInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="relative">
        <input
          name={name}
          type={inputType}
          className="input input-bordered w-full pr-10 focus:outline-none focus:border-primary"
          value={value}
          onChange={onChange}
          {...props}
          required
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-2 z-10 flex items-center bg-transparent opacity-70 hover:text-primary cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </>
  );
};

export default CustomInput;
