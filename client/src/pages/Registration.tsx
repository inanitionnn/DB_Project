import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonBorder, InputBorder } from "../UI";
import { useRegistrMutation } from "../redux/api/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUserState } from "../redux/reducers/userSlice";
import { toast } from "react-toastify";

export const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registrMutation, { data, isLoading, error }] = useRegistrMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmpty = Object.values(form).some((value) => value === "");

    if (isEmpty) return;
    await registrMutation(form);
  };

  useEffect(() => {
    if (data) {
      dispatch(setUserState(data));
      navigation("/");
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
        <div>Loading</div>
      ) : (
        <div
          className="bg-white rounded-md m-auto h-fit"
          data-testid="registration-page"
        >
          <div className="relative my-[3rem] mx-[5rem]">
            <div className=" absolute -right-[2rem] -bottom-[1rem]">
              <Link to="/" data-testid="login-link">
                <p
                  className="text-center text-xl font-semibold text-gray-900 
          decoration-red-400  hover:underline
        hover:text-gray-900 hover:decoration-wavy"
                >
                  Back
                </p>
              </Link>
            </div>
            <h2 className="font-extrabold text-3xl text-center mb-[2rem]">
              Registration
            </h2>
            <form
              onSubmit={handleSubmit}
              className="text-xl font-semibold space-y-[2rem]"
            >
              <div>
                <h3 className="mb-[0.5rem]">Name</h3>
                <InputBorder
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                  data-testid="registration-name-input"
                />
              </div>
              <div>
                <h3 className="mb-[0.5rem]">Email</h3>
                <InputBorder
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  data-testid="registration-email-input"
                />
              </div>
              <div>
                <h3 className="mb-[0.5rem]">Password</h3>
                <InputBorder
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  data-testid="registration-password-input"
                />
              </div>
              <div className="flex justify-center">
                <ButtonBorder
                  type="submit"
                  data-testid="registration-submit-button"
                >
                  Sign up
                </ButtonBorder>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
