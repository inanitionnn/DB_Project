import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Link } from "react-router-dom";
import { ButtonBorder } from "../UI";
import { setlogOutState } from "../redux/reducers/userSlice";
import { setCartLogoutState } from "../redux/reducers/cartSlice";
import { setProductLogoutState } from "../redux/reducers/productSlice";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const finalPrice = useAppSelector((state) => state.cart.total);
  return (
    <header>
      <div className="py-[2rem] px-[3rem] flex justify-between">
        <div className="flex items-center">
          <img
            className="w-[4rem] rotate-45"
            src="sneakers.png"
            alt="sneakers logo"
          />
          <div className="-translate-x-3">
            <h1 className="text-2xl font-extrabold ml-[1rem]">Sneakers Shop</h1>
            <h2 className="text-base font-medium text-gray-600 ml-[1rem]">
              Best sneaker shop
            </h2>
          </div>
        </div>
        <div className="flex gap-[]">
          <ButtonBorder
            onClick={() => {
              dispatch(setCartLogoutState());
              dispatch(setlogOutState());
              dispatch(setProductLogoutState());
            }}
          >
            Logout
          </ButtonBorder>
          <Link
            to="cart"
            className="mr-[0.5rem] flex items-center gap-[1rem] rounded-full 
          border-[2px] border-red-400 px-[1rem] bg-inherit text-gray-900
          hover:bg-red-400 hover:text-white h-[3rem]
          transition-colors ease-out duration-200"
          >
            <p className="font-medium">{finalPrice}$</p>
            <p className="font-medium">|</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};
