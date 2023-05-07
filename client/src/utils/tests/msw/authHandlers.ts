import { rest } from "msw";
import {
  LoginRequest,
  UserResponse,
} from "../../../interfaces/auth.interfaces";

export const authHandlers = [
  rest.post<LoginRequest, UserResponse>("/api/auth/login", (req, res, ctx) => {
    const { email, password } = req.body;
    if (email === "test@example.com" && password === "password") {
      return res(
        ctx.json({
          id: 1,
          name: "Test User",
          email: "test@example.com",
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "Invalid credentials",
        })
      );
    }
  }),
];
