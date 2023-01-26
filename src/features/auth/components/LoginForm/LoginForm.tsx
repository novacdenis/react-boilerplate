import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Form, FormikProvider, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { login } from "../../api";
import { useAuth } from "../../providers";

import { FormController, TextField } from "@/components/FormElements";
import { useFormValidationErrors } from "@/hooks";
import { toFormikValidationSchema } from "@/utils";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
  remember_me: z.boolean(),
});

const initialValues: z.infer<typeof schema> = {
  email: "",
  password: "",
  remember_me: false,
};

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { setAuthorized } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);

    try {
      const response = await login(values);

      setAuthorized(response.user, response.token);
      navigate("/", { replace: true });
    } catch (error) {
      setValidationErrors(error);
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(schema),
    onSubmit,
  });

  const { setValidationErrors } = useFormValidationErrors(formik);

  return (
    <FormikProvider value={formik}>
      <Form>
        <FormController name="email">
          <TextField type="email" inputMode="email" placeholder={t("email") ?? ""} />
        </FormController>
        <FormController name="password">
          <TextField type="password" placeholder={t("password") ?? ""} />
        </FormController>

        <div className="flex items-center justify-center">
          <button type="submit" disabled={isLoading}>
            {t("login")}
          </button>
        </div>
      </Form>
    </FormikProvider>
  );
};
