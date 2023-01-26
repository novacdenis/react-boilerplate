import type { CheckboxProps as CheckboxRootProps } from "@radix-ui/react-checkbox";

import { CheckIcon } from "@heroicons/react/24/outline";
import { Root, Indicator } from "@radix-ui/react-checkbox";
import { clsx } from "clsx";

import { Show } from "../Show";

export interface CheckboxProps extends CheckboxRootProps {}

export const Checkbox: React.FC<CheckboxProps> = ({ className, name, children, ...rest }) => {
  return (
    <div className={clsx("flex items-center space-x-4", className)}>
      <Root
        id={name}
        className="flex h-6 w-6 items-center justify-center border border-slate-400 transition-colors hover:border-slate-700"
        name={name}
        {...rest}
      >
        <Indicator className="h-4 w-4 text-slate-700">
          <CheckIcon />
        </Indicator>
      </Root>
      <Show when={children}>
        <label htmlFor={name}>{children}</label>
      </Show>
    </div>
  );
};
