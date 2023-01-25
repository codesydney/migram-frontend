import { Modal } from "@shopify/polaris";
import { MakeAnOfferForm } from "./MakeAnOfferForm";

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
          <MakeAnOfferForm taskId={taskId} onSubmitSuccess={onClose} />
        </Modal.Section>
      </Modal>
    </div>
  );
};
