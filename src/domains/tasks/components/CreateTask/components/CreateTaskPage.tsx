import { Form, FormLayout, Button, Text, Layout } from "@shopify/polaris";

import { TextField, Select } from "src/common/components/index";

import { useCreateTaskForm } from "../hooks/useCreateTaskForm";
import { StateSchema } from "@Types/schemas";
import { CreateTaskFormState } from "../types";
import {
  TaskCategorySchema,
  TaskTimeEstimateSchema,
  TaskTimeOfArrivalSchema,
} from "@Tasks/common/types";
import { PageWithNotifications } from "src/common/features/notifications";
import { FormPaddingDiv } from "src/common/components/FormPaddingDiv";

export const CreateTaskPage = () => {
  const { control, onSubmit } = useCreateTaskForm();

  return (
    <div aria-label="Create Task Page">
      <PageWithNotifications title="Create Task">
        <Layout.Section>
          <FormPaddingDiv>
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

                <Text as="h3" variant="headingMd">
                  Address:
                </Text>
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
          </FormPaddingDiv>
        </Layout.Section>
      </PageWithNotifications>
    </div>
  );
};
