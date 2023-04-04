import { useState } from "react";
import { Button, Layout } from "@shopify/polaris";
import styled from "styled-components";

import { Task } from "@Tasks/common/types";

import { routerPush } from "@Utils/router";
import { PageWithNotifications } from "src/common/features/notifications";
import { TaskCard } from "./TaskCard";

/**
 * Hides the heading checkbox in the IndexTable
 */
const StyledDiv = styled.div`
  .Polaris-IndexTable__ColumnHeaderCheckboxWrapper {
    display: none;
  }
`;

export const TasksPage = ({
  initialTasks,
  status,
}: {
  initialTasks: Task[];
  status: "authenticated" | "loading" | "unauthenticated";
}) => {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <StyledDiv aria-label="Customer Tasks Page">
      <PageWithNotifications
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
            return <TaskCard task={item} key={item.id} status={status} />;
          })}
        </Layout>
      </PageWithNotifications>
    </StyledDiv>
  );
};
