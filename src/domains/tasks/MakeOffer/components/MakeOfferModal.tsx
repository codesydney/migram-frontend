import { Modal } from "@shopify/polaris";

import { MakeAnOfferForm } from "./MakeOfferForm";
import { createOffer } from "../api";
import { MakeAnOfferFormState } from "../types";

type MakeAnOfferModalProps = {
  taskId: string;
  onClose: () => void;
};

export const MakeAnOfferModal = ({
  taskId,
  onClose,
}: MakeAnOfferModalProps) => {
  const submitHandler = async (data: MakeAnOfferFormState) => {
    const response = await createOffer(taskId, data);
    onClose();
  };

  return (
    <div>
      <Modal open={true} title="Make an Offer" onClose={onClose}>
        <Modal.Section>
          <MakeAnOfferForm submitHandler={submitHandler} />
        </Modal.Section>
      </Modal>
    </div>
  );
};
