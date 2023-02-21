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

import { OfferStatusBadge } from "@Tasks/common/components";

import { Offer, Task } from "@Tasks/common/types";
import {
  getTaskQuery,
  getOffersOfProviderQuery,
  completeOfferMutation,
} from "../api";
import { TaskCard } from "./TaskCard";

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
            {!selectedTask || loading ? (
              <EmptyTaskCardBody loading={loading} />
            ) : (
              <TaskCard task={selectedTask} />
            )}
          </Layout.Section>
        </Layout>
      </Page>
    </StyledDiv>
  );
}
