import { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import { useSession } from "next-auth/react";

import {
  Badge,
  Card,
  Layout,
  Page,
  Stack,
  Text,
  TextContainer,
} from "@shopify/polaris";
import { Status } from "@shopify/polaris/build/ts/latest/src/components/Badge";
import { MakeAnOfferModal } from "@Tasks/Offers/features/MakeAnOfferForm/components/MakeAnOfferModal";

const StyledDiv = styled.div`
  position: relative
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const CategoryStatusMap = {
  open: "success",
  assigned: "info",
  completed: "attention",
  paid: "info",
  pay_decline: "critical",
} as const;

type TaskStatus = keyof typeof CategoryStatusMap;

type TaskCategoryBadgeProps = {
  status: TaskStatus;
};

const TaskCategoryBadge = ({ status }: TaskCategoryBadgeProps) => {
  const badgeStatus = CategoryStatusMap[status] as Status;

  return <Badge status={badgeStatus}>{status}</Badge>;
};

const ListingCard = ({ task, onMakeAnOfferClick }: any) => {
  const hideMakeOfferButton = task.status !== "open";
  const primaryFooterAction = {
    disabled: hideMakeOfferButton,
    content: "Make an Offer",
    onAction: onMakeAnOfferClick,
  };

  return (
    <Card
      title={
        <Stack>
          <Stack.Item fill>
            <Text variant="headingMd" as="h2">
              {task.title}
            </Text>
          </Stack.Item>
          <Stack.Item>
            <TaskCategoryBadge status={task.status as TaskStatus} />
          </Stack.Item>
        </Stack>
      }
      primaryFooterAction={primaryFooterAction}
    >
      <Card.Section title={task.category}>
        <TextContainer>
          <Text as="h1" variant="headingLg">
            ${task.budget}
          </Text>
          <Text as="p" variant="bodyMd">
            {task.details}
          </Text>
        </TextContainer>
      </Card.Section>
    </Card>
  );
};

export function ListingsPage({ myTasks }: any) {
  const [currentPage, setCurrentPage]: any = useState(1);
  const { status } = useSession();
  const [tasks, setTasks]: any[] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();

  function getTasks(currentPage: number, myTasks: boolean) {
    const params = myTasks
      ? { my_tasks: true }
      : { page: currentPage, limit: 6 };

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
        params,
      })
      .then((response) => {
        if (response.data.data.tasks.length == 0) {
          setCurrentPage(currentPage - 1);
        } else {
          setTasks(response.data.data.tasks);
        }
      })
      .catch((error) => {
        if (error.response.data.message == "This page does not exist.") {
          setCurrentPage(currentPage - 1);
        }
      });
  }

  // dedupes requests while loading
  useEffect(() => {
    if (status === "loading") return;

    getTasks(currentPage, myTasks);
  }, [currentPage, status, myTasks]);

  return (
    <Page title="Listings" fullWidth>
      <StyledDiv>
        <Layout>
          {tasks.map((task: any) => (
            <Layout.Section oneHalf key={task.id}>
              <ListingCard
                task={task}
                onMakeAnOfferClick={() => setSelectedTaskId(task.id)}
              />
            </Layout.Section>
          ))}
        </Layout>
      </StyledDiv>
      {selectedTaskId ? (
        <MakeAnOfferModal
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(undefined)}
        />
      ) : null}
    </Page>
  );
}
