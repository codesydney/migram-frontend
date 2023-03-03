import { PageWithNotifications } from "src/components";
import { CheckoutDetails } from "./CheckoutDetails";
import { CheckoutForm } from "./CheckoutForm";
import { useTaskFetch } from "./hooks";

export const CheckoutPage = ({ taskId }: { taskId: string }) => {
  const query = useTaskFetch(taskId);
  const isLoading = query.isLoading;

  return (
    <div aria-label="Checkout Page">
      <PageWithNotifications title="Finalize Payment" fullWidth>
        <CheckoutDetails task={query.data} isLoading={isLoading} />
        <CheckoutForm isPageLoading={isLoading} taskId={taskId} />
      </PageWithNotifications>
    </div>
  );
};
