import { Task } from "@Tasks/common/types";
import { Card, Layout, Text, TextContainer } from "@shopify/polaris";

interface CheckoutDetailsProps {
  task: Task;
  isLoading: boolean;
}

export const CheckoutDetails = ({ task, isLoading }: CheckoutDetailsProps) => {
  if (isLoading) return <div>Loading</div>;

  console.log(task);

  return (
    <Layout.Section>
      <Card>
        <Card.Section title="Task Details">
          <TextContainer>
            <Text as="p" variant="bodyMd">
              {task.details}
            </Text>
          </TextContainer>
        </Card.Section>
        <Card.Section title="Address">
          <TextContainer>
            <Text as="p" variant="bodyMd">
              {task.location.line1} {task.location.line2}
              <br />
              {task.location.city} {task.location.state}{" "}
              {task.location.postal_code}
            </Text>
          </TextContainer>
        </Card.Section>
        <Card.Section title="Amount">
          <TextContainer>
            <Text as="p" variant="bodyLg">
              ${task.budget}
            </Text>
          </TextContainer>
        </Card.Section>
      </Card>
    </Layout.Section>
  );
};
