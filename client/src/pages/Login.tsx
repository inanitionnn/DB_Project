import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonBorder, InputBorder } from "../UI";
import { useLoginMutation } from "../redux/api/authApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hook";
import { setUserState } from "../redux/reducers/userSlice";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loginMutation, { data, isLoading, error }] = useLoginMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmpty = Object.values(form).some((value) => value === "");

    if (isEmpty) return;
    await loginMutation(form);
  };
  useEffect(() => {
    if (data) {
      dispatch(setUserState(data));
      console.log(data);
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(`${error.data.message}`);
    }
  }, [error]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div
          data-testid="login-page"
          className="bg-white rounded-md m-auto h-fit"
        >
          <div className="my-[3rem] mx-[5rem]">
            <h2 className="font-extrabold text-3xl text-center mb-[2rem]">
              Login
            </h2>
            <form
              onSubmit={handleSubmit}
              className="text-xl font-semibold space-y-[2rem]"
              data-testid="login-form"
            >
              <div className="">
                <h3 className="mb-[0.5rem]">Email</h3>
                <InputBorder
                  placeholder="joe@email.com"
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  data-testid="login-email-input"
                />
              </div>
              <div>
                <h3 className="mb-[0.5rem]">Password</h3>
                <InputBorder
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  data-testid="login-password-input"
                />
              </div>
              <div className="flex justify-center">
                <ButtonBorder type="submit" data-testid="login-submit-button">
                  Sign in
                </ButtonBorder>
              </div>
            </form>
            <div className="mt-[2rem]">
              <Link
                to="registration"
                className=" text-center group"
                data-testid="registration-link"
              >
                <p className="text-center text-lg font-medium text-gray-900 decoration-double decoration-red-800">
                  Don`t have account?
                </p>
                <p
                  className="text-center text-lg font-semibold text-gray-600 
              decoration-red-400  group-hover:underline
            group-hover:text-gray-900 group-hover:decoration-wavy"
                >
                  Create a new account
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
