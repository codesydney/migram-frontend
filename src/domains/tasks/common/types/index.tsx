import { AddressSchema } from "@Types/schemas";
import { z } from "zod";

export const CategoryStatusMap = {
  open: "success",
  assigned: "info",
  completed: "attention",
  paid: "info",
  pay_decline: "critical",
  pay_in_processing: "info",
} as const;

export const TaskStatusSchema = z.enum([
  "open",
  "assigned",
  "completed",
  "paid",
  "pay_decline",
  "pay_in_processing",
] as const);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskCategorySchema = z.enum([
  "Cleaning",
  "Gardening",
  "Lawn Mowing",
  "Painting",
] as const);

export const TaskTimeOfArrivalSchema = z.enum([
  "7am-10am",
  "10am-1pm",
  "1pm-4pm",
  "4pm-7pm",
] as const);

export const TaskTimeEstimateSchema = z.enum([
  "1-3hrs",
  "4-6hrs",
  "6-8hrs",
  "moreThan1Day",
] as const);

export const TaskSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  category: TaskCategorySchema.default("Cleaning"),
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(10, { message: "Title must be at least 10 characters long" }),
  details: z
    .string({ required_error: "Details are required" })
    .min(25, { message: "Details must be at least 25 characters long" }),
  budget: z.coerce
    .number({
      invalid_type_error: "Budget must be a number",
    })
    .gt(5, { message: "Budget must be at least $5" }),
  timeOfArrival: TaskTimeOfArrivalSchema.default("7am-10am"),
  timeEstimate: TaskTimeEstimateSchema.default("1-3hrs"),
  status: TaskStatusSchema.default("open"),
  dueDate: z.coerce
    .date({ invalid_type_error: "Due date must be a date" })
    .min(new Date(), { message: "Due date must be in the future" }),
  photos: z.optional(z.array(z.string())),
  location: AddressSchema,
});

export type Task = z.infer<typeof TaskSchema>;

const offer = {
  status: "open",
  _id: "63d32618c1ec5257ad7db4f6",
  offerAmt: 205,
  comments: "Second offer hello world david",
  providerId: "acct_1Lur4rIWxYvLVjGY",
  task: "63d26e6651167241c5f238a4",
  createdAt: "2023-01-27T01:17:12.653Z",
  updatedAt: "2023-01-27T01:17:12.653Z",
  __v: 0,
  timeElapsed: "12 days ago",
  id: "63d32618c1ec5257ad7db4f6",
};

export type Offer = typeof offer;
