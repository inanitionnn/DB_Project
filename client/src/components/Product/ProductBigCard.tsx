import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useAddProductMutation } from "../../redux/api/cartApi";
import { setCartState } from "../../redux/reducers/cartSlice";
import { ButtonBorder } from "../../UI";
import { IProduct } from "../../interfaces/product.interfaces";

interface ProductCardProps {
  product: IProduct;
  [key: string]: any;
}
export default function ProductBigCard({
  product,
  ...props
}: ProductCardProps) {
  const userId = useAppSelector((state) => state.user.user.id);
  const dispatch = useAppDispatch();
  const [addProductMutation, { data, error }] = useAddProductMutation();
  useEffect(() => {
    if (data) {
      console.log(data);

      dispatch(setCartState(data));
    }
  }, [data]);
  useEffect(() => {
    if (error && "data" in error) {
      toast.error(`${error.data.message}`);
    }
  }, [error]);
  return (
    <>
      <div className="max-w-[14rem] mx-auto">
        <h3 className="text-center mt-[0rem] text-2xl font-medium">
          {product.name}
        </h3>
        <img
          className=""
          src={`http://localhost:4000/api/files/${product.photo}`}
          alt="product"
        />
        <div className="flex justify-between mt-[1rem] mb-[2rem] items-center">
          <p className="text-xl font-medium">{product.price}$</p>
          <ButtonBorder
            onClick={() => {
              addProductMutation({ productId: product.id, userId: userId });
              toast.success(`${product.name} added to cart`);
            }}
            data-testid={`${product.name.split(" ")[1].toLowerCase()}-button`}
          >
            add to cart
          </ButtonBorder>
        </div>
      </div>
    </>
  );
}
