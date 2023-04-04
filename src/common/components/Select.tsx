import { ComponentProps } from "react";
import { Select as SelectPrimitive } from "@shopify/polaris";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

export type SelectProps<T extends FieldValues> = UseControllerProps<T> &
  ComponentProps<typeof SelectPrimitive>;

/**
 * Wires up @spotify/polaris' TextField with React Hook Form.
 */
export const Select = <T extends FieldValues>({
  control,
  name,
  ...props
}: SelectProps<T>) => {
  const { field, fieldState } = useController({ control, name });

  return (
    <SelectPrimitive
      {...field}
      {...props}
      name={name}
      error={fieldState.error?.message}
    />
  );
};
