import styled from "styled-components";

const DropDownStyles = styled.div`
  position: absolute;
  z-index: 1;
  background: white;
  border: 1px solid #c4c4c4;
  top: 48px;
  box-shadow: var(--bs);
  border-radius: var(--border-radius);
  right: calc(var(--side) + 24px);
  display: flex;
  flex-direction: column;
  font-weight: 300;
  a {
    padding: 12px;
    margin: 0;
    text-align: center;
    border-radius: var(--border-radius);
  }
  a:hover {
    background-color: var(--lightGrey);
    text-decoration: none;
  }
`;

export default DropDownStyles;
