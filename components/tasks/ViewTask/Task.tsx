import DashboardContext from "../DashboardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";

import TaskStyles from "../../styles/TaskStyles";

export default function Task({ task, selectedTask, setSelectedTask }: any) {
  // const { selectedTask, setSelectedTask } = useContext(DashboardContext);
  console.log(selectedTask);

  return (
    <TaskStyles
      onClick={() => {
        setSelectedTask(task);
        console.log("!!!", selectedTask);
      }}
      selected={selectedTask?.id == task.id}
    >
      <div className="header">
        <div className="icon"></div>
        <div className="category">{task.category}</div>
      </div>
      <div className="body">
        <p>{task.details}</p>
      </div>
      <div className="footer">
        Budget:
        <div className="price">
          <div className="icon">
            <FontAwesomeIcon icon={faDollarSign} color={"black"} />
          </div>
          {task.budget.toFixed(2)}
        </div>
      </div>
    </TaskStyles>
  );
}
