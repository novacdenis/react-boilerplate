import type { AuthResponse, LoginBody, RegisterBody, UserType } from "../types";

import { removeAccessToken, setAccessToken } from "../utils";

import axiosInstance from "@/lib/axios";

export const login = async (body: LoginBody) => {
  try {
    const response = await axiosInstance.post<AuthResponse>("/auth/login", body);
    setAccessToken(response.data.token);

    return Promise.resolve(response.data);
  } catch (error) {
    removeAccessToken();
    return Promise.reject(error);
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  } finally {
    removeAccessToken();
  }
};

export const register = async (body: RegisterBody) => {
  try {
    const response = await axiosInstance.post<AuthResponse>("/auth/register", body);
    setAccessToken(response.data.token);

    return Promise.resolve(response.data);
  } catch (error) {
    removeAccessToken();
    return Promise.reject(error);
  }
};

export const fetchUser = async () => {
  try {
    const token = window.localStorage.getItem("token") ?? "";

    if (!token) {
      return Promise.reject("No token");
    }

    setAccessToken(token);
    const response = await axiosInstance.get<UserType>("/auth/user");

    return Promise.resolve(response.data);
  } catch (error) {
    removeAccessToken();
    return Promise.reject(error);
  }
};
