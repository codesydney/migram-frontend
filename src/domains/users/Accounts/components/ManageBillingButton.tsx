import axios from "axios";

type ManageBillingButtonProps = { customerId: string };

export const ManageBillingButton = ({
  customerId,
}: ManageBillingButtonProps) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers/create-customer-portal-session`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.post(url, {
      customerId,
    });
    const portalUrl = response.data.data.url;
    window.location.replace(portalUrl);
  };

  return (
    <form method="POST" onSubmit={onSubmit}>
      <button>Manage Billing</button>
    </form>
  );
};
