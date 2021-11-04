import { createContext, useEffect, useState } from "react";
import Tasks from "./ViewTask/Tasks";
import DashboardContext from "./DashboardContext";
import { useSession } from "../../node_modules/next-auth/client";
import SingleTask from "./ViewTask/SingleTask";
import axios from "axios";

import BodyStyles from "../styles/BodyStyles";
import ButtonStyles from "../styles/ButtonStyles";
import ProgressStyles from "../styles/ProgressStyles";
import FormControlStyles from "../styles/FormControlStyles";

// use provider to set singletask from inside tasks component

export default function Dashboard({ id, myTasks }: any) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [session, loading]: any = useSession();

  useEffect(() => {
    if (!id || !session) {
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${id}`, {
        // params: { my_tasks: true },
        headers: {
          authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setSelectedTask(response.data.data.task);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, session]);

  return (
    <BodyStyles dashboard>
      <DashboardContext.Provider value={{ selectedTask, setSelectedTask }}>
        <div className="primary">
          <Tasks myTasks={myTasks} />
        </div>
        <div style={{ paddingTop: 32 }} className="secondary">
          <SingleTask myTasks={myTasks} task={{}} />
        </div>
      </DashboardContext.Provider>
    </BodyStyles>
  );
}
