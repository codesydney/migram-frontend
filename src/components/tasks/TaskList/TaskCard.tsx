import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

import styled, { css } from "styled-components";

interface TaskProps {
  selected: any;
}

const TaskStyles = styled.div<Pick<TaskProps, any>>`
  width: 200px;
  height: 200px;
  border-radius: 16px;
  border: 1px solid var(--grey);
  ${(props) =>
    props.selected &&
    css`
      border: 2px solid var(--focus);
    `}
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  :hover {
    cursor: pointer;
  }

  .header {
    padding: 16px;
    display: flex;
    gap: 8px;
    align-items: center;
    text-transform: lowercase;
    .icon {
      width: 24px;
      height: 24px;
      background-color: var(--grey);
      border-radius: 5px;
    }
    .category {
      color: var(--grey);
      font-size: 12px;
      font-weight: bold;
    }
  }
  .body {
    padding: 0 16px 16px 16px;

    p {
      font-size: 16px;
      padding: 0;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      -webkit-box-pack: end;
      overflow: hidden;
    }
  }
  .footer {
    padding: 12px;
    font-size: 12px;
    background-color: var(--lightGrey);
    ${(props) =>
      props.selected &&
      css`
        background-color: var(--focus20);
      `}
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-left: 1px solid var(--lightGrey);
    border-bottom: 1px solid var(--lightGrey);
    border-right: 1px solid var(--lightGrey);
    .price {
      display: flex;
      font-size: 24px;
      font-weight: bold;
      padding-top: 8px;
      gap: 8px;
    }
  }
`;
export default function TaskCard({ task, selectedTask, setSelectedTask }: any) {
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
