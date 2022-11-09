import { ComponentPropsWithRef, forwardRef, Ref } from "react";

interface TextInputProps extends ComponentPropsWithRef<"input"> {
  label: string;
  id: string;
  error?: string;
}

export const TextInput = ({
  id,
  label,
  error,
  ref,
  ...props
}: TextInputProps) => {
  return (
    <div className="labelled-input">
      <label htmlFor={id} className="primary-label">
        {label}
      </label>
      <input ref={ref} id={id} {...props} />
      <label className="error-label">{error}</label>
    </div>
  );
};
