import { Button, Form, FormLayout } from "@shopify/polaris";
import {
  MakeAnOfferFormState,
  MakeAnOfferSubmitHandler,
  useMakeAnOfferForm,
} from "../hooks/useMakeOfferForm";
import { TextField } from "@ComponentsV2/components/TextField";

type MakeAnOfferFormProps = {
  submitHandler: MakeAnOfferSubmitHandler;
};

export const MakeAnOfferForm = ({ submitHandler }: MakeAnOfferFormProps) => {
  const { control, onSubmit } = useMakeAnOfferForm(submitHandler);

  return (
    <Form onSubmit={onSubmit}>
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
