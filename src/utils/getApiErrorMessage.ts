import type { AxiosErrorResponse } from "@/types";

import axios from "axios";

import i18n from "@/lib/i18n";

export const getApiErrorMessage = (response: any) => {
  if (axios.isAxiosError(response)) {
    const error = response as AxiosErrorResponse;

    if (error.response?.data.error) return error.response.data.error;
    if (error.response?.data.message) return error.response.data.message;
  }

  return i18n.t("unknown_error");
};
