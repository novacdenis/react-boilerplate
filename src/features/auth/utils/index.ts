import axiosInstance from "@/lib/axios";

export const setAccessToken = (token: string) => {
  window.localStorage.setItem("token", token);
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAccessToken = () => {
  window.localStorage.removeItem("token");
  delete axiosInstance.defaults.headers.common["Authorization"];
};
