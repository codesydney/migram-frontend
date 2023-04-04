import { BaseSyntheticEvent } from "react";
import { FieldValues, UseFormRegister, FieldErrorsImpl } from "react-hook-form";

export interface FormProps<TFieldValues extends FieldValues> {
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<TFieldValues>;
  errors: Partial<FieldErrorsImpl<TFieldValues>>;
}
