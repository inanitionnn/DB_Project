import { screen, waitFor } from "@testing-library/react";
import { Login } from "./Login";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { appStore } from "../redux/store";
import { server } from "../utils/tests/msw/mswServer";
import { renderRouterProvider } from "../utils";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

describe("Login component", () => {
  test("renders login page correctly", () => {
    renderRouterProvider(<Login />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByTestId("login-email-input")).toBeInTheDocument();
    expect(screen.getByTestId("login-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("login-submit-button")).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    renderRouterProvider(<Login />);

    const emailInput = screen.getByTestId("login-email-input");
    const passwordInput = screen.getByTestId("login-password-input");
    const submitButton = screen.getByTestId("login-submit-button");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("loading")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByTestId("login-form")).not.toBeInTheDocument();
    });

    expect(appStore.getState().user.user).toEqual({
      id: 1,
      name: "Test User",
      email: "test@example.com",
    });
  });

  test("displays error toast when login fails", async () => {
    renderRouterProvider(<Login />);

    const emailInput = screen.getByTestId("login-email-input");
    const passwordInput = screen.getByTestId("login-password-input");
    const submitButton = screen.getByTestId("login-submit-button");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "wrongPassword");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  test("displays loading message while logging in", () => {
    renderRouterProvider(<Login />);

    const emailInput = screen.getByTestId("login-email-input");
    const passwordInput = screen.getByTestId("login-password-input");
    const submitButton = screen.getByTestId("login-submit-button");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");
    userEvent.click(submitButton);

    const loadingMessage = screen.getByText("loading");
    expect(loadingMessage).toBeInTheDocument();
  });
});
