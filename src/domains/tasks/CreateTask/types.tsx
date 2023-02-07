import { z } from "zod";
import { TaskSchema } from "@Tasks/common/types";

export const CreateTaskFormSchema = TaskSchema;

export type CreateTaskFormState = z.infer<typeof CreateTaskFormSchema>;
