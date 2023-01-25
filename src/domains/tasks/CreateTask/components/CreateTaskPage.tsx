import { Page, Layout, Form, FormLayout, Button } from "@shopify/polaris";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextField } from "@ComponentsV2/components/TextField";
import { Select } from "@ComponentsV2/components";
export const offerSchema = z.object({});

export const TaskStatusSchema = z.enum([
  "open",
  "assigned",
  "completed",
  "paid",
  "pay_decline",
  "pay_in_processing",
] as const);

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

export const CreateTaskFormSchema = z.object({
  category: TaskCategorySchema,
  title: z.string().min(10),
  details: z.string().min(25),
  budget: z.number().gt(5),
  timeOfArrival: TaskTimeOfArrivalSchema,
  timeEstimate: TaskTimeEstimateSchema,
  status: TaskStatusSchema,
  dueDate: z.string(),
  photos: z.optional(z.array(z.string())),
  location: z.object({
    name: z.string(),
    type: z.string(),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
});

export type CreateTaskFormState = z.infer<typeof CreateTaskFormSchema>;

export const submitHandler = async (data: CreateTaskFormState) => {};

export const useCreateTaskForm = () => {
  const { control, handleSubmit } = useForm<CreateTaskFormState>({
    mode: "onBlur",
    resolver: zodResolver(CreateTaskFormSchema),
  });

  return { control, onSubmit: handleSubmit(submitHandler) };
};

export const CreateTaskPage = () => {
  const { control, onSubmit } = useCreateTaskForm();

  return (
    <div aria-label="Create Task Page">
      <Page title="Create Task">
        <Form onSubmit={onSubmit}>
          <FormLayout>
            <TextField<CreateTaskFormState>
              name="title"
              label="Title"
              type="text"
              autoComplete="off"
              control={control}
            />

            <TextField<CreateTaskFormState>
              name="budget"
              label="Budget"
              type="number"
              autoComplete="off"
              control={control}
            />

            <Select<CreateTaskFormState>
              options={TaskCategorySchema.options}
              label="Category"
              name="category"
              control={control}
            />

            <TextField<CreateTaskFormState>
              name="details"
              label="Details"
              type="text"
              autoComplete="off"
              control={control}
            />

            <TextField<CreateTaskFormState>
              name="dueDate"
              label="Due Date"
              type="date"
              autoComplete="off"
              control={control}
            />

            <Select<CreateTaskFormState>
              name="timeOfArrival"
              label="Time of Arrival"
              options={TaskTimeOfArrivalSchema.options}
              control={control}
            />
            <Select<CreateTaskFormState>
              name="timeEstimate"
              label="Estimated Time"
              options={TaskTimeEstimateSchema.options}
              control={control}
            />
            {/*
                photos: z.optional(z.array(z.string())),
                location: z.object({
                  name: z.string(),
                  type: z.string(),
                  coordinates: z.tuple([z.number(), z.number()]),
                }),
            */}
            <Button primary submit size="large">
              Submit
            </Button>
          </FormLayout>
        </Form>
      </Page>
    </div>
  );
};
