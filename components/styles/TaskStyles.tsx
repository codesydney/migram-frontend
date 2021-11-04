import styled, { css } from "styled-components";

const TaskStyles = styled.div`
  margin-bottom: 32px;
  width: 328px;
  height: 160px;
  left: 250px;
  :hover {
    cursor: pointer;
  }
  .transparent-header {
    height: 32px;
    font-weight: 200;
    padding-left: 10px;
  }
  .wrapper {
    position: relative;
  }
  .icon {
    position: absolute;
    z-index: 1;
    height: 64px;
    width: 64px;
    top: -32px;
    right: 16px;
    border-radius: 10px;
    background: white;
    border: 1px solid #c4c4c4;
  }
  .body {
    height: 128px;
    background: #c4c4c4;
    border-radius: 10px;
  }
`;

export default TaskStyles;
