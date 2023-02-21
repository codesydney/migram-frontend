import { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  EmptyState,
  Layout,
  Page,
  Spinner,
  Stack,
  Text,
  TextContainer,
} from "@shopify/polaris";
import styled from "styled-components";

import { Offer, Task, TaskStatus } from "@Tasks/common/types";
import { OfferStatusBadge, TaskStatusBadge } from "@Tasks/common/components";
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
  const showMarkAsCompleteButton = offer.status === "accepted";

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
                <Button onClick={() => completeOfferMutation(offer.task)}>
                  Mark as Complete
                </Button>
              ) : null}
            </ButtonGroup>
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  );
}

function EmptyTaskCardBody({ loading }: { loading: boolean }) {
  console.log(loading);

  return (
    <Card sectioned>
      <EmptyState heading="View Task Details Here" image={""}>
        {loading ? (
          <Spinner />
        ) : (
          <p>Click on the &quot;View Task Details&quot; button.</p>
        )}
      </EmptyState>
    </Card>
  );
}

export function TaskCard({
  task,
  loading,
}: {
  task: Task | undefined;
  loading: boolean;
}) {
  if (!task || loading) {
    return <EmptyTaskCardBody loading={loading} />;
  }

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

const StyledDiv = styled.div`
  .Polaris-Layout {
    flex-direction: column-reverse;

    .Polaris-Layout__Section {
      width: 100%;
    }

    @media (min-width: 1200px) {
      flex-direction: row;
    }
  }
`;

export function ViewOffersPage({
  status,
}: {
  status: "authenticated" | "loading" | "unauthenticated";
}) {
  const [offers, setOffers] = useState(new Array<Offer>());
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [loading, setLoading] = useState(false);

  const onViewTaskClick = async (taskId: string) => {
    setLoading(true);

    getTaskQuery(taskId)
      .then((task) => {
        setSelectedTask(task);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
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
    <StyledDiv aria-label="View Offers Page">
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
            <TaskCard task={selectedTask} loading={loading} />
          </Layout.Section>
        </Layout>
      </Page>
    </StyledDiv>
  );
}
