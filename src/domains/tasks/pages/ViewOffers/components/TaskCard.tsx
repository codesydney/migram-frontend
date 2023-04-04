import {
  Card,
  EmptyState,
  Spinner,
  Stack,
  Text,
  TextContainer,
} from "@shopify/polaris";

import { Task, TaskStatus, TaskStatusBadge } from "@Tasks/common";

export type TaskCardProps = { task?: Task; loading: boolean };

/**
 * This component is shown when a Task has not been selected yet.
 */
function EmptyTaskCardBody() {
  return (
    <Card sectioned title="View Task Details">
      <EmptyState image={""}>
        <Text as="h1" variant="headingMd">
          To view a task, click on the &quot;View Task Details&quot; link on a
          task.
        </Text>
      </EmptyState>
    </Card>
  );
}

export function TaskCard({ task, loading }: TaskCardProps) {
  if (!task) {
    return <EmptyTaskCardBody />;
  }

  const { location } = task;

  return (
    <Card sectioned title="View Task Details">
      {loading ? (
        <Spinner />
      ) : (
        <>
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
                {location.line1} {location.line2}, {location.city}{" "}
                {location.state} {location.postal_code}
              </Text>
            </TextContainer>
          </Card.Section>
        </>
      )}
    </Card>
  );
}
