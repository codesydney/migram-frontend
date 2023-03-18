import { Modal } from "@shopify/polaris";

import { MakeAnOfferForm } from "./MakeOfferForm";

type MakeAnOfferModalProps = {
  taskId: string;
  onClose: () => void;
};

export const MakeAnOfferModal = ({
  taskId,
  onClose,
}: MakeAnOfferModalProps) => {
  return (
    <div>
      <Modal open={true} title="Make an Offer" onClose={onClose}>
        <Modal.Section>
          <MakeAnOfferForm taskId={taskId} onClose={onClose} />
        </Modal.Section>
      </Modal>
    </div>
  );
};
