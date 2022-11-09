import { forwardRef, Ref, ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > * {
    display: block;
    width: 100%;
  }

  label {
    font-size: 1rem;
  }

  .error-label {
    color: red;
  }
`;

interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
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
      <StyledDiv className="labelled-input">
        <label htmlFor={id} className="primary-label">
          {label}
        </label>
        <input ref={ref} id={id} {...props} />
        <label className="error-label">{error}</label>
      </StyledDiv>
    );
  }
);

TextInput.displayName = "TextInput";
