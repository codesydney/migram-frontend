import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  ButtonGroup,
  Card,
  EmptyState,
  Layout,
  Spinner,
  Stack,
  Text,
  TextContainer,
} from "@shopify/polaris";
import { AxiosError } from "axios";
import styled from "styled-components";

import { OfferStatusBadge } from "@Tasks/common/components";

import { Offer, Task } from "@Tasks/common/types";
import { getTaskQuery, completeOfferMutation } from "../api";
import {
  PageWithNotifications,
  useNotifications,
} from "src/common/features/notifications";

import { createNotification } from "src/common/features/notifications/utils";

const TaskCard = dynamic(() =>
  import("./TaskCard").then((mod) => mod.TaskCard)
);

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
      .then((res) => {
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

function EmptyTaskCardBody({ loading }: { loading: boolean }) {
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

const StyledDiv = styled.div`
  .Polaris-Layout {
    .Polaris-Layout__Section {
      width: 100%;
    }

    @media (min-width: 1200px) {
      flex-direction: row;
    }
  }
`;

export type ViewOffersPageProps = {
  initialOffers: Offer[];
};

export function ViewOffersPage({ initialOffers }: ViewOffersPageProps) {
  const { dispatchNotifications } = useNotifications();

  const [offers, setOffers] = useState(initialOffers);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [loading, setLoading] = useState(false);

  const onViewTaskClick = async (taskId: string) => {
    setLoading(true);

    getTaskQuery(taskId)
      .then((task) => {
        setSelectedTask(task);
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          dispatchNotifications({
            type: "set",
            event: createNotification({
              isError: true,
              title: error.response.data.message,
              type: "notification",
              status: "warning",
              source: "Api Error",
            }),
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <StyledDiv aria-label="View Offers Page">
      <PageWithNotifications title="Offers" fullWidth>
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
          {!selectedTask || loading ? (
            <EmptyTaskCardBody loading={loading} />
          ) : (
            <TaskCard task={selectedTask} />
          )}
        </Layout.Section>
      </PageWithNotifications>
    </StyledDiv>
  );
}
