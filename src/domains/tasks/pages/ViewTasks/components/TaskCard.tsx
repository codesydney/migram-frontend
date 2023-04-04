import { useState, useEffect } from "react";
import {
  Stack,
  Button,
  Card,
  Layout,
  Text,
  TextContainer,
} from "@shopify/polaris";
import dynamic from "next/dynamic";

import {
  useNotifications,
  createNotification,
} from "src/common/features/notifications";
import { routerPush } from "@Utils/router";

import { Task, TaskStatus, TaskStatusBadge } from "@Tasks/common";

import { getOffersOfTaskQuery } from "../api";

const OffersTable = dynamic(() =>
  import("./OffersTable").then((mod) => mod.OffersTable)
);

const OffersSectionTitle = ({ onClick }: { onClick: () => void }) => {
  return (
    <Stack>
      <Stack.Item fill>
        <Text as="h3" variant="headingSm">
          Offers
        </Text>
      </Stack.Item>
      <Stack.Item>
        <Button onClick={onClick}>View</Button>
      </Stack.Item>
    </Stack>
  );
};

export const OffersSection = ({
  task,
  status,
}: {
  task: Task;
  status: "authenticated" | "loading" | "unauthenticated";
}) => {
  const { id: taskId } = task;

  const [showOffers, setShowOffers] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<any>(task);
  const { dispatchNotifications } = useNotifications();

  useEffect(() => {
    if (status === "loading") return;

    getOffersOfTaskQuery(task.id)
      .then((response: any) => {
        if (taskId == response.data.data.task._id) {
          setUpdatedTask(response.data.data.task);
        }
      })
      .catch((error: any) => {
        setUpdatedTask(task);

        const action = {
          type: "set",
          event: createNotification({
            status: "critical",
            isError: true,
            title: error.response.data.message,
            type: "notification",
            source: "Get Offers of Task Failure",
          }),
        } as const;

        dispatchNotifications(action);
      });
  }, [dispatchNotifications, status, task, taskId]);

  return (
    <Card.Section
      title={<OffersSectionTitle onClick={() => setShowOffers(!showOffers)} />}
    >
      {showOffers ? <OffersTable offers={updatedTask.offers} /> : null}
    </Card.Section>
  );
};

export const TaskCard = ({
  task,
  status,
}: {
  task: Task;
  status: "authenticated" | "loading" | "unauthenticated";
}) => {
  const { location } = task;
  const isCompleted = task.status === "completed";
  const isDue =
    task.paymentStatus === "payment_due" ||
    task.paymentStatus === "pay_decline";

  const checkoutButton =
    isCompleted && isDue
      ? {
          content: "Finalize Payment",
          onAction: () => routerPush(`/checkout/${task.id}`),
        }
      : undefined;

  return (
    <Layout.Section>
      <article aria-label="Task Card">
        <Card sectioned primaryFooterAction={checkoutButton}>
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
          <OffersSection task={task} status={status} />
        </Card>
      </article>
    </Layout.Section>
  );
};
