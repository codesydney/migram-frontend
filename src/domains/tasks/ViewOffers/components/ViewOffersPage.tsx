import { useState, useEffect } from "react";
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
import styled from "styled-components";

import { OfferStatusBadge } from "@Tasks/common/components";

import { Offer, Task } from "@Tasks/common/types";
import {
  getTaskQuery,
  getOffersOfProviderQuery,
  completeOfferMutation,
} from "../api";
import { PageWithNotifications } from "src/components";
import { useApiEvents } from "src/common/features/ApiResponse";
import {
  createApiResponse,
  createDefaultApiErrorEvent,
} from "src/common/features/ApiResponse";
import { AxiosError } from "axios";

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
  status: "authenticated" | "loading" | "unauthenticated";
};

export function ViewOffersPage({ status }: ViewOffersPageProps) {
  const { dispatchApiEvents } = useApiEvents();

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
        if (error instanceof AxiosError && error.response) {
          dispatchApiEvents({
            type: "set",
            event: createApiResponse(error.response, {
              message: error.response.data.message,
            }).apiEvent,
          });
        }
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
        if (error instanceof AxiosError) {
          const errorMessage =
            "Failed to load offers. Please contact support if refreshing the page does not work.";

          const apiEvent = error.response
            ? createApiResponse(error.response, {
                message: errorMessage,
              }).apiEvent
            : createDefaultApiErrorEvent({
                message: errorMessage,
              });

          dispatchApiEvents({
            type: "set",
            event: apiEvent,
          });
        }
      });
  }, [dispatchApiEvents, status]);

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
