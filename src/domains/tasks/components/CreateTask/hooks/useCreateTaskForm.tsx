import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateTaskFormSchema, CreateTaskFormState } from "../types";
import { createTask } from "../api";
import { routerPush } from "@Utils/router";
import { useNotifications } from "src/common/features/notifications";
import { createNotification } from "src/common/features/notifications/utils";

export const useCreateTaskForm = () => {
  const { dispatchNotifications } = useNotifications();
  const { control, handleSubmit } = useForm<CreateTaskFormState>({
    mode: "onBlur",
    resolver: zodResolver(CreateTaskFormSchema),
  });

  const submitHandler = async (data: CreateTaskFormState) => {
    dispatchNotifications({ type: "clear" });

    try {
      await createTask(data).then((res) => {
        const action = {
          type: "set",
          event: createNotification({
            isError: false,
            title: "Task created",
            type: "toast",
            status: "success",
            source: "Create Task Success",
          }),
        } as const;

        dispatchNotifications(action);
      });

      routerPush("/tasks");
    } catch (error: any) {
      const action = {
        type: "set",
        event: createNotification({
          isError: true,
          title: error.response.data.message,
          type: "notification",
          status: "critical",
          source: "Create Task Failure",
        }),
      } as const;

      dispatchNotifications(action);
    }
  };

  return { control, onSubmit: handleSubmit(submitHandler) };
};
