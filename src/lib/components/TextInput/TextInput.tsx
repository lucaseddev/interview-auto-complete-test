import React from "react";
import { Spinner } from "lib/components";

import "./TextInput.styles.scss";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
}

interface InputAffixProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children: React.ReactNode;

  isLoading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

const InputAffix = React.memo(
  ({ children, disabled, readOnly, isLoading, className }: InputAffixProps) => {
    return (
      <div
        data-disabled={disabled}
        data-readonly={readOnly}
        className={`deel-TextInput ${className}`}
      >
        {children}
        {isLoading && <Spinner />}
      </div>
    );
  }
);

export const TextInput = React.forwardRef(function TextInput(
  { disabled, readOnly, className, isLoading, ...rest }: TextInputProps,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <InputAffix className={className} isLoading={isLoading} disabled={disabled}>
      <input
        aria-required={rest.required}
        aria-disabled={disabled}
        readOnly={readOnly}
        disabled={disabled}
        ref={ref}
        {...rest}
      />
    </InputAffix>
  );
});
