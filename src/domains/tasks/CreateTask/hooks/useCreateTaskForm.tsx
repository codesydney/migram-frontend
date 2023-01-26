import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateTaskFormSchema, CreateTaskFormState } from "../types";

export const submitHandler = async (data: CreateTaskFormState) => {};

export const useCreateTaskForm = () => {
  const { control, handleSubmit } = useForm<CreateTaskFormState>({
    mode: "onBlur",
    resolver: zodResolver(CreateTaskFormSchema),
  });

  return { control, onSubmit: handleSubmit(submitHandler) };
};
