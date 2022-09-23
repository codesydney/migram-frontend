import styled from "styled-components";
import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskCard from "./TaskCard";

const PaginationStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  .page-change {
    align-self: center;
    place-self: center;
    :hover {
      cursor: pointer;
    }
  }

  button {
    background: none;
    border: none;
  }
`;

const TasksStyles = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  grid-gap: 32px;
  @media only screen and (max-width: 900px) {
  }
`;

export default function TasksList({
  myTasks,
  currentPage,
  setCurrentPage,
  setSelectedTask,
  selectedTask,
  tasks,
  getTasks,
}: any) {
  return (
    <PaginationStyles>
      {tasks.length > 0 ? (
        <>
          <button
            className="page-change"
            onClick={() => {
              getTasks(currentPage - 1, myTasks);
              setCurrentPage(currentPage - 1);
            }}
          >
            <FontAwesomeIcon
              icon={faCaretSquareLeft}
              color={currentPage == 1 ? "grey" : "black"}
            />
          </button>
          <TasksStyles>
            {tasks.map((task: any) => (
              <TaskCard
                handleClick={() => {
                  setSelectedTask(task);
                  console.log("!!!", selectedTask);
                }}
                key={task.id}
                task={task}
                selected={selectedTask?.id == task.id}
              />
            ))}
          </TasksStyles>

          <button
            className="page-change"
            onClick={() => {
              getTasks(currentPage + 1, myTasks);
              setCurrentPage(currentPage + 1);
            }}
          >
            <FontAwesomeIcon icon={faCaretSquareRight} color={"black"} />
          </button>
        </>
      ) : (
        <div>...</div>
      )}
    </PaginationStyles>
  );
}
