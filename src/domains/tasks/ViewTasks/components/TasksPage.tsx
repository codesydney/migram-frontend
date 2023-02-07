import { Card } from "@shopify/polaris";

export const TaskCard = () => {
  return (
    <div aria-label="Task Card">
      <Card sectioned>
        <Card.Header title={"Title"}></Card.Header>
        <Card.Section title="Details"></Card.Section>
        <Card.Section title="Offers"></Card.Section>
      </Card>
    </div>
  );
};

export const TasksPage = () => {
  return (
    <div aria-label="Customer Tasks Page">
      <TaskCard />
    </div>
  );
};
