import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
  errors?: { [key: string]: string[] };
  error?: string;
}

export type AxiosErrorResponse = AxiosError<ApiErrorResponse, string>;

export interface ApiSuccessResponse {
  message: string;
}
