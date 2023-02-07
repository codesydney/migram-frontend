import { Button, Card, Stack, Text } from "@shopify/polaris";

const OffersSectionTitle = () => {
  return (
    <Stack>
      <Stack.Item fill>
        <Text as="h3" variant="headingSm">
          Offers
        </Text>
      </Stack.Item>
      <Stack.Item>
        <Button>View</Button>
      </Stack.Item>
    </Stack>
  );
};

export const TaskCard = () => {
  return (
    <article aria-label="Task Card">
      <Card sectioned>
        <Card.Header title={"Title"}></Card.Header>
        <Card.Section title="Details"></Card.Section>
        <Card.Section title={<OffersSectionTitle />}></Card.Section>
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
