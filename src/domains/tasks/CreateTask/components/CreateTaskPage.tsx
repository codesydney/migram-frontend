import { Page, Form, FormLayout, Button } from "@shopify/polaris";

import { TextField, Select } from "@ComponentsV2/components";

import { useCreateTaskForm } from "../hooks/useCreateTaskForm";
import {
  CreateTaskFormState,
  TaskCategorySchema,
  TaskTimeOfArrivalSchema,
  TaskTimeEstimateSchema,
} from "../types";

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
              type="currency"
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
