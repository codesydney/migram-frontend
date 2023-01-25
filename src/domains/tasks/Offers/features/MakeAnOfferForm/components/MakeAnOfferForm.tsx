import { Button, Form, FormLayout } from "@shopify/polaris";
import {
  MakeAnOfferFormState,
  useMakeAnOfferForm,
} from "../hooks/useMakeAnOfferForm";
import { TextField } from "@ComponentsV2/components/TextField";

type MakeAnOfferFormProps = {
  taskId: string;
  onSubmitSuccess: () => void;
};

export const MakeAnOfferForm = ({
  taskId,
  onSubmitSuccess,
}: MakeAnOfferFormProps) => {
  const { control, onSubmit } = useMakeAnOfferForm(taskId);

  return (
    <Form onSubmit={() => onSubmit().then(() => onSubmitSuccess())}>
      <FormLayout>
        <TextField<MakeAnOfferFormState>
          name="offerAmt"
          label="Amount"
          type="currency"
          autoComplete=""
          inputMode="decimal"
          control={control}
        />
        <TextField<MakeAnOfferFormState>
          name="comments"
          label="Description"
          type="text"
          autoComplete=""
          control={control}
        />
        <Button primary submit size="large">
          Submit
        </Button>
      </FormLayout>
    </Form>
  );
};
