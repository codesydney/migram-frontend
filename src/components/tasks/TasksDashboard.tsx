import { useState } from "react";
import TasksList from "./TaskList/TasksList";
import TaskDetails from "./TaskDetails/TaskDetails";

import BodyStyles from "../styles/BodyStyles";
import { FilterTasks, TaskCategory, TaskStatus } from "./TaskList";

// use provider to set singletask from inside tasks component

export default function TasksDashboard({ id, myTasks }: any) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  console.log("SELECTED", selectedTask);

  return (
    <>
      <FilterTasks
        setCurrentPage={setCurrentPage}
        filter={myTasks ? status : category}
        setFilter={myTasks ? setStatus : setCategory}
        filterItems={Object.values(myTasks ? TaskStatus : TaskCategory)}
      />
      <BodyStyles dashboard topBar>
        <div className="primary">
          <TasksList
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            status={status}
            category={category}
            id={id}
            myTasks={myTasks}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
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
