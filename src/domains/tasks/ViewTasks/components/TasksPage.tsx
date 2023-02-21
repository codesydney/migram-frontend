import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Card,
  Layout,
  Page,
  Stack,
  Text,
  TextContainer,
} from "@shopify/polaris";
import styled from "styled-components";

import { TaskStatusBadge } from "@Tasks/common/components";
import { Task, TaskStatus } from "@Tasks/common/types";

import { getTasksOfCustomerQuery, getOffersOfTaskQuery } from "../api";
import { routerPush } from "@Utils/router";

const OffersTable = dynamic(() =>
  import("./OffersTable").then((mod) => mod.OffersTable)
);

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

export const OffersSection = ({ task }: { task: Task }) => {
  const { id: taskId } = task;

  const [showOffers, setShowOffers] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<any>(task);

  useEffect(() => {
    getOffersOfTaskQuery(task.id)
      .then((response: any) => {
        if (taskId == response.data.data.task._id) {
          setUpdatedTask(response.data.data.task);
        }
      })
      .catch((error: any) => {
        setUpdatedTask(task);
      });
  }, [task, taskId]);

  return (
    <Card.Section
      title={<OffersSectionTitle onClick={() => setShowOffers(!showOffers)} />}
    >
      {showOffers ? <OffersTable offers={updatedTask.offers} /> : null}
    </Card.Section>
  );
};

export const TaskCard = ({ task }: { task: Task }) => {
  const { location } = task;

  return (
    <Layout.Section>
      <article aria-label="Task Card">
        <Card sectioned>
          <Card.Header
            title={
              <Stack>
                <Stack.Item fill>
                  <Text variant="headingMd" as="h2">
                    {task.title}
                  </Text>
                </Stack.Item>
                <Stack.Item>
                  <TaskStatusBadge status={task.status as TaskStatus} />
                </Stack.Item>
              </Stack>
            }
          />
          <Card.Section
            title={
              <Text as="h3" variant="headingMd">
                Details
              </Text>
            }
          >
            <TextContainer spacing="tight">
              <Text as="h3" variant="headingSm">
                ${task.budget}
              </Text>
              <Text as="p" variant="bodyMd">
                {task.category}
              </Text>
              <Text as="p" variant="bodyMd">
                {task.details}
              </Text>
              <Text as="p" variant="bodyMd">
                {location.line1} {location.line2}, {location.city}{" "}
                {location.state} {location.postal_code}
              </Text>
            </TextContainer>
          </Card.Section>
          <OffersSection task={task} />
        </Card>
      </article>
    </Layout.Section>
  );
};

/**
 * Hides the heading checkbox in the IndexTable
 */
const StyledDiv = styled.div`
  .Polaris-IndexTable__ColumnHeaderCheckboxWrapper {
    display: none;
  }
`;

export const TasksPage = ({
  status,
}: {
  status: "authenticated" | "loading" | "unauthenticated";
}) => {
  const [currentPage, setCurrentPage]: any = useState(1);
  const [tasks, setTasks] = useState(Array<Task>);

  function getTasks(currentPage: number) {
    getTasksOfCustomerQuery()
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

  useEffect(() => {
    if (status === "loading") return;

    getTasks(currentPage);
  }, [currentPage, status]);

  return (
    <StyledDiv aria-label="Customer Tasks Page">
      <Page
        title="Tasks"
        fullWidth
        primaryAction={
          <Button primary onClick={() => routerPush("/tasks/new")}>
            Create Task
          </Button>
        }
      >
        <Layout>
          {tasks.map((item) => {
            return <TaskCard task={item} key={item.id} />;
          })}
        </Layout>
      </Page>
    </StyledDiv>
  );
};
