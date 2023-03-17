import { Button, Form, FormLayout } from "@shopify/polaris";

import { TextField } from "src/components";

import { useMakeAnOfferForm } from "../hooks/useMakeOfferForm";
import { MakeAnOfferFormState } from "../types";
import { createOffer } from "../api";
import { useNotifications } from "src/common/features/notifications";
import { createNotification } from "src/common/features/notifications/utils";

type MakeAnOfferFormProps = {
  taskId: string;
  onClose: () => void;
};

export const MakeAnOfferForm = ({ taskId, onClose }: MakeAnOfferFormProps) => {
  const { dispatchNotifications } = useNotifications();

  const submitHandler = async (data: MakeAnOfferFormState) => {
    dispatchNotifications({ type: "clear" });
    createOffer(taskId, data)
      .then((res) => {
        const action = {
          type: "set",
          event: createNotification({
            isError: false,
            title: "Successfully created Offer",
            type: "toast",
            status: "success",
            source: "Make Offer Success",
          }),
        } as const;

        dispatchNotifications(action);

        onClose();
      })
      .catch((err) => {
        const action = {
          type: "set",
          event: createNotification({
            isError: true,
            title: err.response.data.message,
            type: "toast",
            status: "critical",
            source: "Make Offer Failure",
          }),
        } as const;

        dispatchNotifications(action);
      });
  };

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
