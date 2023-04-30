import React, { useEffect } from "react";
import { Header } from "../modules";
import { useGetProductsQuery } from "../redux/api/productApi";
import { toast } from "react-toastify";
import { useGetCartQuery } from "../redux/api/cartApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setCartState } from "../redux/reducers/cartSlice";
import ProductBigCard from "../components/ProductBigCard";
import { setProductState } from "../redux/reducers/productSlice";

export const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const userId = useAppSelector((state) => state.user.user.id);
  const { data: cartData, error: cartError, refetch } = useGetCartQuery(userId);
  const {
    data: productsData,
    isLoading,
    error: productsError,
  } = useGetProductsQuery();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (cartData) {
      dispatch(setCartState(cartData));
      console.log(cartData);
    }
  }, [cartData]);
  useEffect(() => {
    if (cartError && "data" in cartError) {
      toast.error(`${cartError.data.message}`);
    }
  }, [cartError]);

  useEffect(() => {
    if (productsData) {
      dispatch(setProductState(productsData));
      console.log(productsData);
    }
  }, [productsData]);

  useEffect(() => {
    if (productsError && "data" in productsError) {
      toast.error(`${productsError.data.message}`);
    }
  }, [productsError]);
  return (
    <div className="bg-white rounded-md m-[4rem] w-[80rem]">
      <Header />
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="px-[3rem]">
          <div>
            {products.length !== 0 && (
              <div className="grid grid-cols-3 mt-[2rem] gap-[1.5rem]">
                {products.map((product) => (
                  <ProductBigCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
