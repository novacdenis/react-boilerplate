import { Children, cloneElement } from "react";

import { clsx } from "clsx";
import { useField } from "formik";

import { Show } from "../Show";

export interface FormControllerProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  name: string;
  children: React.ReactNode;

  label?: string;
  valuePropName?: string;
}

export const FormController: React.FC<FormControllerProps> = ({
  name,
  label,
  valuePropName = "value",
  className,
  children,
  ...rest
}) => {
  const [{ value, ...filedProps }, meta] = useField(name);

  return (
    <fieldset className={clsx("mb-6", className)} {...rest}>
      <Show when={label}>
        <label htmlFor={name}>{label}</label>
      </Show>

      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, {
          ...filedProps,
          [valuePropName]: value,
        })
      )}

      <Show when={meta.touched && meta.error}>
        <div className="mt-1 text-sm text-red-600">{meta.error}</div>
      </Show>
    </fieldset>
  );
};
