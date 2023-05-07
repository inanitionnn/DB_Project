import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { renderRouterProvider } from "../utils";
import { LoggedRoutes } from "./LoggedRoutes";

describe("Logged router", () => {
  test("Router test", () => {
    renderRouterProvider(<LoggedRoutes />);

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
    const registrationLink = screen.getByTestId("registration-link");
    userEvent.click(registrationLink);
    expect(screen.getByTestId("registration-page")).toBeInTheDocument();
    const loginLink = screen.getByTestId("login-link");
    userEvent.click(loginLink);
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  test("Router error test", () => {
    renderRouterProvider(<LoggedRoutes />);

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });
});
