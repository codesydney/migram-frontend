import { Card, Stack, Text, TextContainer } from "@shopify/polaris";

import { Task, TaskStatus } from "@Tasks/common/types";
import { TaskStatusBadge } from "@Tasks/common/components";

export type TaskCardProps = { task: Task };

export function TaskCard({ task }: TaskCardProps) {
  const { location } = task;

  return (
    <Card sectioned>
      <Card.Header
        title={
          <Stack>
            <Stack.Item fill>
              <Text variant="headingMd" as="h2">
                {task.title}
              </Text>
            </Stack.Item>
            <Stack.Item>
              <TaskStatusBadge status={task.status as TaskStatus} />
            </Stack.Item>
          </Stack>
        }
      />
      <Card.Section
        title={
          <Text as="h3" variant="headingMd">
            Details
          </Text>
        }
      >
        <TextContainer spacing="tight">
          <Text as="h3" variant="headingSm">
            ${task.budget}
          </Text>
          <Text as="p" variant="bodyMd">
            {task.category}
          </Text>
          <Text as="p" variant="bodyMd">
            {task.details}
          </Text>
          <Text as="p" variant="bodyMd">
            {location.line1} {location.line2}, {location.city} {location.state}{" "}
            {location.postal_code}
          </Text>
        </TextContainer>
      </Card.Section>
    </Card>
  );
}
