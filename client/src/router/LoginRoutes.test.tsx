import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { renderRouterProvider } from "../utils";
import { LoginRoutes } from "./LoginRoutes";

describe("Login router", () => {
  test("Router test", () => {
    renderRouterProvider(<LoginRoutes />);

    expect(screen.getByTestId("main-page")).toBeInTheDocument();
    const cartLink = screen.getByTestId("cart-link");
    userEvent.click(cartLink);
    expect(screen.getByTestId("cart-page")).toBeInTheDocument();
    const mainLink = screen.getByTestId("main-link");
    userEvent.click(mainLink);
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });
  test("Router error test", () => {
    renderRouterProvider(<LoginRoutes />);

    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });
});
