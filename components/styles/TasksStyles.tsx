import styled, { css } from "styled-components";

const TasksStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 900px) {
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

export default TasksStyles;
