import { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  EmptyState,
  Layout,
  Page,
  Stack,
  Text,
  TextContainer,
  Badge,
} from "@shopify/polaris";

import { Offer, Task, TaskStatus } from "@Tasks/common/types";
import { TaskStatusBadge } from "@Tasks/common/components";
import {
  completeOfferMutation,
  getTaskQuery,
  getOffersOfProviderQuery,
} from "../api";

export function OfferCard({
  offer,
  onViewTaskClick,
}: {
  offer: Offer;
  onViewTaskClick(): void;
}) {
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
            <Badge status="success">Accepted</Badge>
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
              <Button onClick={() => completeOfferMutation(offer.task)}>
                Mark as Complete
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  );
}

function EmptyTaskCardBody() {
  return (
    <Card sectioned>
      <EmptyState
        heading="View Task Details Here"
        action={{ content: "Add transfer" }}
        secondaryAction={{
          content: "Learn more",
          url: "https://help.shopify.com",
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Click on the &quot;View Task Details&quot; button.</p>
      </EmptyState>
    </Card>
  );
}

export function TaskCard({ task }: { task: Task | undefined }) {
  if (!task) {
    return <EmptyTaskCardBody />;
  }

  const { location } = task;
  const addressText = `${location.line1} ${location.line2}, ${location.city} ${location.state} ${location.postal_code}`;

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
            {addressText}
          </Text>
        </TextContainer>
      </Card.Section>
    </Card>
  );
}

export function ViewOffersPage({
  status,
}: {
  status: "authenticated" | "loading" | "unauthenticated";
}) {
  const [offers, setOffers] = useState(new Array<Offer>());
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const onViewTaskClick = async (taskId: string) => {
    getTaskQuery(taskId)
      .then((task) => {
        setSelectedTask(task);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (status === "loading") return;

    getOffersOfProviderQuery()
      .then((offers) => {
        setOffers(offers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status]);

  return (
    <div aria-label="View Offers Page">
      <Page title="Offers" fullWidth>
        <Layout>
          <Layout.Section oneHalf>
            {offers.map((offer) => {
              return (
                <OfferCard
                  offer={offer}
                  key={offer.id}
                  onViewTaskClick={() => {
                    onViewTaskClick(offer.task);
                  }}
                />
              );
            })}
          </Layout.Section>
          <Layout.Section oneHalf>
            <TaskCard task={selectedTask} />
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
