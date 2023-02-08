import { Button, Card, IndexTable, Stack, Text } from "@shopify/polaris";
import { useState } from "react";

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

export const OffersTable = () => {
  return (
    <div aria-label="Offers Table">
      <Card>
        <IndexTable headings={[{ title: "Offer" }]} itemCount={2}>
          <tr />
          <tr />
        </IndexTable>
      </Card>
    </div>
  );
};

export const OffersSection = () => {
  const [showOffers, setShowOffers] = useState(false);

  return (
    <Card.Section
      title={<OffersSectionTitle onClick={() => setShowOffers(!showOffers)} />}
    >
      {showOffers ? <OffersTable /> : null}
    </Card.Section>
  );
};

export const TaskCard = () => {
  return (
    <article aria-label="Task Card">
      <Card sectioned>
        <Card.Header title={"Title"}></Card.Header>
        <Card.Section title="Details"></Card.Section>
        <OffersSection />
      </Card>
    </article>
  );
};

export const TasksPage = () => {
  return (
    <div aria-label="Customer Tasks Page">
      <TaskCard />
    </div>
  );
};
