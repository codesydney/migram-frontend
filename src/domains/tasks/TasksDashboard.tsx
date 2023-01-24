import { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import { useSession } from "next-auth/react";

import { Badge, Card } from "@shopify/polaris";
import { routerPush } from "@Utils/router";
import { Status } from "@shopify/polaris/build/ts/latest/src/components/Badge";

const StyledDiv = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .Polaris-Card {
    margin-top: 0rem;
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }
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

export default function TasksDashboard({ myTasks }: any) {
  const [currentPage, setCurrentPage]: any = useState(1);
  const { status } = useSession();
  const [tasks, setTasks]: any[] = useState([]);

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

  useEffect(() => {
    if (status === "loading") return;

    getTasks(currentPage, myTasks);
  }, [currentPage, status, myTasks]);

  return (
    <StyledDiv>
      {tasks.map((task: any) => (
        <Card
          key={task.id}
          title={
            <h3>
              {task.title}{" "}
              <TaskCategoryBadge status={task.status as TaskStatus} />
            </h3>
          }
          primaryFooterAction={{
            content: "View Details",
            onAction: () => routerPush(`/tasks/${task.id}`),
          }}
        >
          <Card.Section title={task.category}>
            <p>{task.details}</p>
          </Card.Section>
        </Card>
      ))}
    </StyledDiv>
  );
}
