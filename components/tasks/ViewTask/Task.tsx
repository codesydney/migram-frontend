import DashboardContext from "../DashboardContext";
import { useEffect, useState, useContext } from "react";

import TaskStyles from "../../styles/TaskStyles";

export default function Task({ task }: any) {
  const { setSelectedTask } = useContext(DashboardContext);

  return (
    <TaskStyles
      onClick={() => {
        setSelectedTask(task);
      }}
    >
      <div className="transparent-header">{task.id}</div>
      <div className="wrapper">
        <div className="icon"></div>
      </div>
      <div className="body"></div>
    </TaskStyles>
  );
}
