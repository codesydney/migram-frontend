import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateTaskFormSchema, CreateTaskFormState } from "../types";
import { createTask } from "../api";
import { routerPush } from "@Utils/router";

export const submitHandler = async (data: CreateTaskFormState) => {
  try {
    const response = await createTask(data);
    routerPush("/tasks");
  } catch (error: any) {
    console.error(error);
  }
};

export const useCreateTaskForm = () => {
  const { control, handleSubmit } = useForm<CreateTaskFormState>({
    mode: "onBlur",
    resolver: zodResolver(CreateTaskFormSchema),
  });

  return { control, onSubmit: handleSubmit(submitHandler) };
};
