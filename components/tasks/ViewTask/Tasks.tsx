import axios from "axios";
import DashboardContext from "../DashboardContext";
import { useEffect, useState, useContext } from "react";
import { useSession } from "../../../node_modules/next-auth/client";
import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Task from "./Task";

import TasksStyles from "../../styles/TasksStyles";
import PaginationStyles from "../../styles/PaginationStyles";

export default function Tasks({
  myTasks,
  currentPage,
  setCurrentPage,
  setSelectedTask,
  selectedTask,
  category,
  status,
}: any) {
  const [session, loading]: any = useSession();
  const [tasks, setTasks] = useState([]);
  console.log(category);

  function getTasks(currentPage: number) {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
        params: { page: currentPage, limit: 6, category: category },
        headers: {
          authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.data.tasks.length == 0) {
          setCurrentPage(currentPage - 1);
        } else {
          setTasks(response.data.data.tasks);
        }

        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.message == "This page does not exist.") {
          setCurrentPage(currentPage - 1);
        }
      });
  }

  function getMyTasks() {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
        params: { my_tasks: true, status: status },
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

  useEffect(() => {
    setSelectedTask(null);
    if (loading) return;
    if (!myTasks) {
      getTasks(currentPage);
    } else {
      getMyTasks();
    }
  }, [loading, category, status]);

  return (
    <PaginationStyles>
      {tasks.length > 0 ? (
        <>
          {myTasks ? (
            <div />
          ) : (
            <button
              className="page-change"
              onClick={() => {
                getTasks(currentPage - 1);
                setCurrentPage(currentPage - 1);
              }}
            >
              <FontAwesomeIcon
                icon={faCaretSquareLeft}
                color={currentPage == 1 ? "grey" : "black"}
              />
            </button>
          )}

          <TasksStyles>
            {tasks.map((task: any) => (
              <Task
                setSelectedTask={setSelectedTask}
                selectedTask={selectedTask}
                key={task}
                task={task}
              />
            ))}
          </TasksStyles>
          {myTasks ? (
            <div />
          ) : (
            <button
              className="page-change"
              onClick={() => {
                getTasks(currentPage + 1);
                setCurrentPage(currentPage + 1);
              }}
            >
              <FontAwesomeIcon icon={faCaretSquareRight} color={"black"} />
            </button>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </PaginationStyles>
  );
}
