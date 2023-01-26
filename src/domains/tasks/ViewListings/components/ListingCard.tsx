import { Card, Stack, TextContainer, Text } from "@shopify/polaris";

import { TaskStatus } from "../../types";
import { TaskCategoryBadge } from "@Tasks/components";

export const ListingCard = ({ task, onMakeAnOfferClick }: any) => {
  const hideMakeOfferButton = task.status !== "open";
  const primaryFooterAction = {
    disabled: hideMakeOfferButton,
    content: "Make an Offer",
    onAction: onMakeAnOfferClick,
  };

  return (
    <Card
      title={
        <Stack>
          <Stack.Item fill>
            <Text variant="headingMd" as="h2">
              {task.title}
            </Text>
          </Stack.Item>
          <Stack.Item>
            <TaskCategoryBadge status={task.status as TaskStatus} />
          </Stack.Item>
        </Stack>
      }
      primaryFooterAction={primaryFooterAction}
    >
      <Card.Section title={task.category}>
        <TextContainer>
          <Text as="h1" variant="headingLg">
            ${task.budget}
          </Text>
          <Text as="p" variant="bodyMd">
            {task.details}
          </Text>
        </TextContainer>
      </Card.Section>
    </Card>
  );
};
