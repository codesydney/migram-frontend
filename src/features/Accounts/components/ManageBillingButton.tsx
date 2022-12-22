type ManageBillingButtonProps = { customerId: string };

export const ManageBillingButton = ({
  customerId,
}: ManageBillingButtonProps) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers/${customerId}/paymentMethods`;

  return (
    <form method="POST" action={url}>
      <button>Manage Billing</button>
    </form>
  );
};
