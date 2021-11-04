import axios from "axios";
import DashboardContext from "../DashboardContext";
import { useEffect, useState, useContext } from "react";
import { useSession } from "../../../node_modules/next-auth/client";
import TasksStyles from "../../styles/TasksStyles";
import Task from "./Task";

export default function Tasks({ myTasks }: any) {
  const [session, loading]: any = useSession();
  const [tasks, setTasks] = useState([]);
  const { setSelectedTask } = useContext(DashboardContext);

  console.log(myTasks);

  useEffect(() => {
    setSelectedTask(null);
    if (loading) return;
    if (!myTasks) {
      // Get all tasks
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
          // params: { my_tasks: true },
          headers: {
            authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((response) => {
          setTasks(response.data.data.tasks);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Get my tasks
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
          params: { my_tasks: true },
          headers: {
            authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((response) => {
          setTasks(response.data.data.tasks);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loading]);

  return (
    <TasksStyles>
      {tasks.map((task: any) => (
        <Task
          onClick={() => {
            console.log("TEST", task._id);
            setSelectedTask(task);
          }}
          key={task}
          task={task}
        />
      ))}
    </TasksStyles>
  );
}
