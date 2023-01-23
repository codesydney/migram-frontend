import { useEffect, useState } from "react";
import styled from "styled-components";

import { TaskCategory, TaskStatus } from "./TaskList";
import axios from "axios";
import { useSession } from "next-auth/react";

import { Card } from "@shopify/polaris";

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
`;

export default function TasksDashboard({ myTasks }: any) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage]: any = useState(1);
  const { status } = useSession();
  const [tasks, setTasks]: any[] = useState([]);

  const [filter, setFilter] = useState("");
  const filterItems = Object.values(myTasks ? TaskStatus : TaskCategory);
  const filteredTasks = tasks.filter(
    (task: any) => (myTasks ? task.status : task.category) === filter
  );

  function getTasks(currentPage: number, myTasks: boolean) {
    const params = myTasks
      ? { my_tasks: true, status: filter }
      : { page: currentPage, limit: 6, category: filter };

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
    setSelectedTask(null);
    if (status === "loading") return;

    getTasks(currentPage, myTasks);
  }, [currentPage, status, myTasks]);

  return (
    <StyledDiv>
      {tasks.map((task: any) => (
        <Card
          key={task.id}
          title={task.title}
          primaryFooterAction={{ content: "View Details" }}
        >
          <Card.Section title="Items">{task.details}</Card.Section>
        </Card>
      ))}
    </StyledDiv>
  );
}
