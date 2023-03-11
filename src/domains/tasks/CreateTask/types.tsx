import { z } from "zod";
import { TaskSchema } from "@Tasks/common/types";

export const CreateTaskFormSchema = TaskSchema.omit({
  id: true,
  customerId: true,
  paymentStatus: true
});

export type CreateTaskFormState = z.infer<typeof CreateTaskFormSchema>;
