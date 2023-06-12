import { PrimaryButton } from "./PrimaryButton";

export function MakePaymentButton({ taskId }: { taskId: string }) {
  return (
    <a href={`/checkout/${taskId}`}>
      <PrimaryButton>Make Payment</PrimaryButton>
    </a>
  );
}
