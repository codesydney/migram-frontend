import { useState, useEffect } from "react";
import axios from "axios";
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

import { Offer, Task } from "@Tasks/common/types";

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
              <Button>Mark as Complete</Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  );
}

export function TaskCard({ task }: { task: Task | undefined }) {
  if (!task) {
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

  return (
    <Card title="Task">
      <Card.Section>
        Click on the &quot;View Task Details&quot; button.
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

  const onViewTaskClick = (taskId: string) => {
    console.log(taskId);
  };

  useEffect(() => {
    if (status === "loading") return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/offers`, {
        params: { my_offers: true },
      })
      .then((response) => {
        setOffers(response.data.data.offers);
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
