import React, { ButtonHTMLAttributes } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  [key: string]: any;
}
export const ButtonBorder: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="mr-[0.5rem] flex items-center gap-[1rem] rounded-full 
  border-[2px] border-red-400 px-[1rem] bg-inherit text-gray-900
  hover:bg-red-400 hover:text-white h-[3rem]
  transition-colors ease-out duration-200 font-medium"
      {...props}
    >
      {children}
    </button>
  );
};
