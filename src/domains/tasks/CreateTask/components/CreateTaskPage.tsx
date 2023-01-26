import { Page, Form, FormLayout, Button } from "@shopify/polaris";

import { TextField, Select } from "@ComponentsV2/components";

import { useCreateTaskForm } from "../hooks/useCreateTaskForm";
import {
  CreateTaskFormState,
  TaskCategorySchema,
  TaskTimeOfArrivalSchema,
  TaskTimeEstimateSchema,
} from "../types";
import { StateSchema } from "@Types/schemas";

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
              requiredIndicator
              autoComplete="off"
              control={control}
            />

            <TextField<CreateTaskFormState>
              name="budget"
              label="Budget"
              type="currency"
              requiredIndicator
              autoComplete="off"
              control={control}
            />

            <Select<CreateTaskFormState>
              options={TaskCategorySchema.options}
              label="Category"
              requiredIndicator
              name="category"
              control={control}
            />

            <TextField<CreateTaskFormState>
              name="details"
              label="Details"
              requiredIndicator
              autoComplete="off"
              control={control}
            />

            <TextField<CreateTaskFormState>
              name="dueDate"
              label="Due Date"
              type="date"
              requiredIndicator
              autoComplete="off"
              control={control}
            />

            <Select<CreateTaskFormState>
              name="timeOfArrival"
              label="Time of Arrival"
              requiredIndicator
              options={TaskTimeOfArrivalSchema.options}
              control={control}
            />
            <Select<CreateTaskFormState>
              name="timeEstimate"
              label="Estimated Time"
              requiredIndicator
              options={TaskTimeEstimateSchema.options}
              control={control}
            />
            <TextField<CreateTaskFormState>
              name="location.line1"
              label="Line 1"
              requiredIndicator
              autoComplete="off"
              control={control}
            />
            <TextField<CreateTaskFormState>
              name="location.line2"
              label="Line 2"
              autoComplete="off"
              control={control}
            />
            <FormLayout.Group condensed>
              <TextField<CreateTaskFormState>
                name="location.city"
                label="City"
                requiredIndicator
                autoComplete="off"
                control={control}
              />
              <Select<CreateTaskFormState>
                name="location.state"
                label="State"
                requiredIndicator
                options={StateSchema.options}
                control={control}
              />
              <TextField<CreateTaskFormState>
                name="location.postal_code"
                label="Postcode"
                requiredIndicator
                autoComplete="off"
                control={control}
              />
            </FormLayout.Group>
            <Button primary submit size="large">
              Submit
            </Button>
          </FormLayout>
        </Form>
      </Page>
    </div>
  );
};
