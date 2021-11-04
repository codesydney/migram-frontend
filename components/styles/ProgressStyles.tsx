import styled from "styled-components";

const ProgressStyles = styled.progress`
  height: 12px;
  width: 100%;
  color: black;
  ::-moz-progress-bar {
    background: black;
    border-radius: 6px;
    border: 0;
  }
  [value]::-webkit-progress-bar {
    background-color: black;
    height: 12px;
  }
`;

export default ProgressStyles;
