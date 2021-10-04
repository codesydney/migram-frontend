import styled from "styled-components";

const ProgressStyles = styled.progress`
  width: 100%;
  height: 12px;
  color: black;
  ::-moz-progress-bar {
    background: black;
    border-radius: 6px;
    border: 0;
  }
  ::-webkit-progress-value {
    background: black;
  }
`;

export default ProgressStyles;
