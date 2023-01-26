import type { AxiosErrorResponse } from "@/types";

import { useCallback } from "react";

import axios from "axios";
import { FormikContextType } from "formik";

import { getApiErrorMessage } from "@/utils";

export const useFormValidationErrors = <T>(
  formInstance: FormikContextType<T & { global_errors?: string }>
) => {
  const setValidationErrors = useCallback(
    (response: any) => {
      if (axios.isAxiosError(response)) {
        const error = response as AxiosErrorResponse;

        if (error.response?.status === 422) {
          if (error.response.data.errors) {
            const errors = error.response.data.errors;

            Object.keys(errors).forEach((key) => {
              formInstance.setFieldError(key, errors[key][0]);
            });

            return true;
          }
        }
      }

      formInstance.setFieldError("global_errors", getApiErrorMessage(response));

      return true;
    },
    [formInstance]
  );

  return { setValidationErrors };
};
