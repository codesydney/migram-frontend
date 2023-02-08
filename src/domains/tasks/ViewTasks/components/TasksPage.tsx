import { Card } from "@shopify/polaris";

export const TaskCard = () => {
  return (
    <div aria-label="Task Card">
      <Card sectioned></Card>
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
