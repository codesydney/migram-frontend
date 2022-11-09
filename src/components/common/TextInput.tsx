import { forwardRef, Ref, ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

interface TextInputProps extends ComponentPropsWithRef<"input"> {
  label: string;
  id: string;
  error?: string;
}

export const TextInput = forwardRef(
  (
    { id, label, error, ...props }: TextInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className="labelled-input">
        <label htmlFor={id} className="primary-label">
          {label}
        </label>
        <input ref={ref} id={id} {...props} />
        <label className="error-label">{error}</label>
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
