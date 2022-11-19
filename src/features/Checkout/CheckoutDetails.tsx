interface CheckoutDetailsProps {
  task: any;
  isLoading: boolean;
}

export const CheckoutDetails = ({ task, isLoading }: CheckoutDetailsProps) => {
  return <div>{isLoading ? "Loading" : "Task"}</div>;
};
