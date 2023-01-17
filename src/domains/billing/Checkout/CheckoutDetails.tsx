import Task from "src/types/task";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .provider-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    > p {
      margin: 0;
    }
  }

  .temp-invoice-pdf {
    border: 1px solid #d6d3d1;
    height: 2rem;
  }

  .temp-provider-avatar {
    border: 1px solid #d6d3d1;
    border-radius: 100%;
    width: 3rem;
    height: 3rem;
  }

  .checkout-details-footer {
    .price {
      display: flex;
      align-items: center;
      margin-top: 1.5rem;
      justify-content: space-between;
    }

    h5 {
      margin: 0;
    }
  }
`;

interface CheckoutDetailsProps {
  task: Task;
  isLoading: boolean;
}

export const CheckoutDetails = ({ task, isLoading }: CheckoutDetailsProps) => {
  if (isLoading) return <div>Loading</div>;

  return (
    <StyledDiv>
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
    </StyledDiv>
  );
};
