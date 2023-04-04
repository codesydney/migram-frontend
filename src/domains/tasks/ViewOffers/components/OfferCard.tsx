import {
  Card,
  Stack,
  TextContainer,
  ButtonGroup,
  Button,
  EmptyState,
  Spinner,
  Text,
} from "@shopify/polaris";

import {
  useNotifications,
  createNotification,
} from "src/common/features/notifications";
import { OfferStatusBadge } from "@Tasks/common/components";
import { Offer } from "@Tasks/common/types";

import { completeOfferMutation } from "../api";

export function OfferCard({
  offer,
  onViewTaskClick,
}: {
  offer: Offer;
  onViewTaskClick(): void;
}) {
  const showMarkAsCompleteButton = offer.status === "accepted";
  const { dispatchNotifications } = useNotifications();

  const onCompleteTaskClick = () => {
    completeOfferMutation(offer.task)
      .then(() => {
        const action = {
          type: "set",
          event: createNotification({
            isError: false,
            title: "Task marked as completed",
            type: "toast",
            status: "success",
            source: "Mark Task as Completed Success",
          }),
        } as const;

        dispatchNotifications(action);
      })
      .catch((err: any) => {
        const action = {
          type: "set",
          event: createNotification({
            isError: true,
            title: err.response.data.message,
            type: "toast",
            status: "critical",
            source: "Mark Task as Completed Failure",
          }),
        } as const;

        dispatchNotifications(action);
      });
  };

  return (
    <Card
      sectioned
      title={
        <Stack>
          <Stack.Item fill>
            <Text variant="headingMd" as="h2">
              Offer
            </Text>
          </Stack.Item>
          <Stack.Item>
            <OfferStatusBadge status={offer.status} />
          </Stack.Item>
        </Stack>
      }
    >
      <Card.Section>
        <Stack vertical>
          <TextContainer spacing="tight">
            <Text as="h3" variant="headingMd">
              ${offer.offerAmt}
            </Text>
            <Text as="p" variant="bodyMd">
              {offer.comments}
            </Text>
          </TextContainer>
          <Stack distribution="trailing">
            <ButtonGroup>
              <Button plain onClick={onViewTaskClick}>
                View Task Details
              </Button>
              {showMarkAsCompleteButton ? (
                <Button onClick={onCompleteTaskClick}>Mark as Complete</Button>
              ) : null}
            </ButtonGroup>
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  );
}
