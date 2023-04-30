import React, { useEffect } from "react";
import { ButtonBorder } from "../UI";
import {
  useAddProductMutation,
  useSubtractProductMutation,
} from "../redux/api/cartApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { toast } from "react-toastify";
import { setCartState } from "../redux/reducers/cartSlice";
import { ICartProduct } from "../interfaces/cart.interfaces";

interface ProductCardProps {
  product: ICartProduct;
  [key: string]: any;
}
export default function ProductSmallCard({
  product,
  ...props
}: ProductCardProps) {
  const userId = useAppSelector((state) => state.user.user.id);
  const dispatch = useAppDispatch();
  const [addProductMutation, { data: addData, error: addError }] =
    useAddProductMutation();
  const [
    subtractProductMutation,
    { data: subtractData, error: subtractError },
  ] = useSubtractProductMutation();

  useEffect(() => {
    if (subtractData) {
      console.log(subtractData);
      dispatch(setCartState(subtractData));
    }
  }, [subtractData]);
  useEffect(() => {
    if (subtractError && "data" in subtractError) {
      toast.error(`${subtractError.data.message}`);
    }
  }, [subtractError]);

  useEffect(() => {
    if (addData) {
      console.log(addData);
      dispatch(setCartState(addData));
    }
  }, [addData]);
  useEffect(() => {
    if (addError && "data" in addError) {
      toast.error(`${addError.data.message}`);
    }
  }, [addError]);
  return (
    <>
      <div className="mx-[4rem] flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-[5rem]"
            src={`http://localhost:4000/api/files/${product.photo}`}
            alt="product"
          />
          <div className="mx-[2rem]">
            <h3 className="text-center mt-[0rem] text-xl font-medium">
              {product.name}
            </h3>
            <p className="text-lg font-medium">{product.price}$</p>
          </div>
        </div>
        <div className="flex items-center gap-[0.5rem]">
          <ButtonBorder
            onClick={() =>
              subtractProductMutation({ productId: product.id, userId: userId })
            }
          >
            -
          </ButtonBorder>
          <p className="text-2xl font-medium">{product.count}</p>
          <ButtonBorder
            onClick={() =>
              addProductMutation({ productId: product.id, userId: userId })
            }
          >
            +
          </ButtonBorder>

          <p className="text-2xl font-medium">
            ${product.count * product.price}
          </p>
        </div>
      </div>
    </>
  );
}
