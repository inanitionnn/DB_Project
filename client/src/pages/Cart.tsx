import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonBorder } from "../UI";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { toast } from "react-toastify";
import { setCartLogoutState } from "../redux/reducers/cartSlice";
import ProductSmallCard from "../components/ProductSmallCard";
import { useDeleteProductsMutation } from "../redux/api/cartApi";

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteProductMutation, { data, error }] = useDeleteProductsMutation();
  const userId = useAppSelector((state) => state.user.user.id);
  const cart = useAppSelector((state) => state.cart);
  const total = cart.total;
  const products = cart.products;
  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(setCartLogoutState());
    }
  }, [data]);
  useEffect(() => {
    if (error && "data" in error) {
      toast.error(`${error.data.message}`);
    }
  }, [error]);

  return (
    <div className="bg-white rounded-md m-[4rem] w-[80rem]">
      <div className="py-[2rem] px-[3rem] flex justify-between mb-[2rem]">
        <div className="flex items-center">
          <img
            className="w-[4rem] rotate-45"
            src="sneakers.png"
            alt="sneakers logo"
          />
          <div className="-translate-x-3">
            <h1 className="text-2xl font-extrabold ml-[1rem]">Cart</h1>
            <h2 className="text-base font-medium text-gray-600 ml-[1rem]">
              Best sneaker shop
            </h2>
          </div>
        </div>
        <ButtonBorder onClick={() => navigate(-1)}>Back</ButtonBorder>
      </div>
      {products.length !== 0 && (
        <>
          {products.map((product) => (
            <ProductSmallCard product={product} key={product.id} />
          ))}
          <div className="mt-[1rem] h-[1px] bg-gray-400 mx-[5rem] w-auto"></div>
          <div className="mt-[1rem] flex items-center justify-center gap-[2rem]">
            <p className="text-xl font-normal">Total count {total}$</p>
            <ButtonBorder
              onClick={() => {
                deleteProductMutation(userId);
                toast.success(`placing an order for the amount of ${total}$`);
              }}
            >
              Buy
            </ButtonBorder>
          </div>
        </>
      )}
    </div>
  );
};
