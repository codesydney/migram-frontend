import { useEffect, useState } from "react";

import { FilterTasks, TaskCategory, TasksList, TaskStatus } from "./TaskList";
import axios from "axios";
import { useSession } from "next-auth/react";
import { TaskDetails } from "./TaskDetails";
import BodyStyles from "@Components/styles/BodyStyles";

// use provider to set singletask from inside tasks component

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
    <>
      <FilterTasks
        setCurrentPage={setCurrentPage}
        filter={filter}
        setFilter={setFilter}
        filterItems={filterItems}
      />
      <BodyStyles dashboard topBar>
        <div className="primary">
          <TasksList
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            myTasks={myTasks}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            tasks={filter !== "" ? filteredTasks : tasks}
            getTasks={getTasks}
          />
        </div>
        <div
          style={{
            paddingTop: 32,
            borderColor: selectedTask ? "var(--focus)" : "var(--lightGrey)",
          }}
          className="secondary"
        >
          <TaskDetails selectedTask={selectedTask} />
        </div>
      </BodyStyles>
    </>
  );
}
