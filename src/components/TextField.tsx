import { ComponentProps } from "react";
import { TextField as TextFieldPrimitive } from "@shopify/polaris";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

export type TextFieldProps<T extends FieldValues> = UseControllerProps<T> &
  ComponentProps<typeof TextFieldPrimitive>;

/**
 * Wires up @spotify/polaris' TextField with React Hook Form.
 */
export const TextField = <T extends FieldValues>({
  control,
  name,
  ...props
}: TextFieldProps<T>) => {
  const { field, fieldState } = useController({ control, name });

  return (
    <TextFieldPrimitive
      {...field}
      {...props}
      name={name}
      error={fieldState.error?.message}
    />
  );
};
