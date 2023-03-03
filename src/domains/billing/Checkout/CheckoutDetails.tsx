import { Task } from "@Tasks/common/types";

interface CheckoutDetailsProps {
  task: Task;
  isLoading: boolean;
}

export const CheckoutDetails = ({ task, isLoading }: CheckoutDetailsProps) => {
  if (isLoading) return <div>Loading</div>;

  return (
    <div>
      <div className="checkout-details-body">
        <h2>Task Details</h2>
        <h4>{task.details}</h4>
        <p>123 Fake St, Sydney NSW 2000</p>

        <h4>Your task was completed by</h4>
        <div className="provider-container">
          <div className="temp-provider-avatar"></div>
          <p>John Provider</p>
        </div>

        <div className="invoice-container">
          <h4>Invoice</h4>
          <div className="temp-invoice-pdf">pdf</div>
        </div>
      </div>
      <div className="checkout-details-footer">
        <div className="price-container">
          <h5 className="price">
            <span>Total</span>
            <span>AUD ${task.budget}</span>
          </h5>
        </div>
      </div>
    </div>
  );
};
