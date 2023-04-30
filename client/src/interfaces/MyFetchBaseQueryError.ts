import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export type MyFetchBaseQueryError =
  | {
      status: number;
      data: {
        message: string;
        statusCode: number;
      };
    }
  | Omit<FetchBaseQueryError, "status" | "data">;
