import { Badge } from "@shopify/polaris";
import { Status } from "@shopify/polaris/build/ts/latest/src/components/Badge";
import { OfferStatus } from "../types";

/**
 * Maps the OfferStatus to the Polaris Status
 */
export const OfferStatusToPolarisStatusMap = {
  open: "success",
  accepted: "info",
  completed: "attention",
  outbidded: "info",
} as const;

export type OfferStatusBadgeProps = {
  status: OfferStatus;
};

export const OfferStatusBadge = ({ status }: OfferStatusBadgeProps) => {
  const badgeStatus = OfferStatusToPolarisStatusMap[status] as Status;

  return <Badge status={badgeStatus}>{status}</Badge>;
};
