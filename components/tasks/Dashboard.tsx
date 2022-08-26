import { createContext, useEffect, useState } from "react";
import Tasks from "./ViewTask/Tasks";
import DashboardContext from "./DashboardContext";
import { useSession } from "../../node_modules/next-auth/client";
import SingleTask from "./ViewTask/SingleTask";
import axios from "axios";

import BodyStyles from "../styles/BodyStyles";
import FilterTasks, { TaskCategory, TaskStatus } from "./ViewTask/FilterTasks";

// use provider to set singletask from inside tasks component

export default function Dashboard({ id, myTasks }: any) {
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
          <Tasks
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
          <SingleTask selectedTask={selectedTask} myTasks={myTasks} task={{}} />
        </div>
      </BodyStyles>
    </>
  );
}
