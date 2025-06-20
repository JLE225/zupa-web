import React from "react";

const CustomTextarea = ({
  label,
  name,
  value,
  onChange,
  rows = 4,
  ...props
}) => {
  return (
    <>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="textarea textarea-bordered w-full focus:outline-none focus:border-primary"
        {...props}
      />
    </>
  );
};

export default CustomTextarea;
