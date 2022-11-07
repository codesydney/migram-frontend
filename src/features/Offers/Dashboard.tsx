import { useState } from "react";

import { TaskDetails } from "../Tasks/TaskDetails";
import BodyStyles from "../../components/styles/BodyStyles";
import { FilterOffers, Offers } from ".";

export function Dashboard() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState("");
  return (
    <>
      <FilterOffers status={status} setStatus={setStatus}></FilterOffers>
      <BodyStyles dashboard topBar>
        <div className="primary">
          <Offers
            status={status}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        </div>
        <div
          style={{
            paddingTop: 32,
            borderColor: selectedTask ? "var(--focus)" : "var(--lightGrey)",
          }}
          className="secondary"
        >
          <TaskDetails selectedTask={selectedTask} myTasks={false} task={{}} />
        </div>
      </BodyStyles>
    </>
  );
}
