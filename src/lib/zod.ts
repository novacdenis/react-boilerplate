import { z } from "zod";

import i18n from "./i18n";

const zodIntlErrors = (issue: z.ZodIssueOptionalMessage) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (["undefined", "null", "unknown", "void"].includes(issue.received)) {
      return i18n.t("validations.required");
    }
  }

  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === "email") {
      return i18n.t("validations.invalid_email");
    }

    if (issue.validation === "url") {
      return i18n.t("validations.invalid_url");
    }
  }

  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === "string") {
      return i18n.t("validations.too_small.string", { min: issue.minimum });
    }

    if (issue.type === "number") {
      return i18n.t("validations.too_small.number", { min: issue.minimum });
    }
  }

  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === "string") {
      return i18n.t("validations.too_big.string", { max: issue.maximum });
    }

    if (issue.type === "number") {
      return i18n.t("validations.too_big.number", { max: issue.maximum });
    }
  }
};

const zodErrorMap: z.ZodErrorMap = (issue) => {
  const intlError = zodIntlErrors(issue);

  if (intlError) {
    return { message: intlError };
  }

  return {
    message: issue.message || i18n.t("unknown_error") || "Unknown error",
  };
};

export default zodErrorMap;
