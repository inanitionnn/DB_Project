import React, { InputHTMLAttributes } from "react";

export const InputBorder: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <input
      className="bg-inherit rounded-full text-lg font-medium border-[2px]
      focus:outline-none focus:border-red-400
      border-gray-900 px-[1rem] h-[3rem] text-gray-900 
      transition duration-300 ease-out"
      type="text"
      {...props}
    />
  );
};
