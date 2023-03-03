import { PageWithNotifications } from "src/components";
import { CheckoutForm } from "./CheckoutForm";
import { useTaskFetch } from "./hooks";
import { Card, Layout, Text, TextContainer } from "@shopify/polaris";

export const CheckoutPage = ({ taskId }: { taskId: string }) => {
  const query = useTaskFetch(taskId);
  const isLoading = query.isLoading;

  if (isLoading) return <div>Loading</div>;

  const task = query.data;

  return (
    <div aria-label="Checkout Page">
      <PageWithNotifications title="Finalize Payment" fullWidth>
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
        <CheckoutForm isPageLoading={isLoading} taskId={taskId} />
      </PageWithNotifications>
    </div>
  );
};
