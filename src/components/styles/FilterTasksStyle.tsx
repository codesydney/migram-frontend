import styled from "styled-components";

const FilterTasksStyles = styled.div`
  height: 100px;
  margin-left: var(--side);
  display: flex;
  align-items: center;
  gap: 24px;
  button {
    font-size: 16px;
    height: 24px;
    border: none;
    border-radius: var(--border-radius);
  }
  button:disabled,
  button[disabled] {
    background-color: var(--black);
    color: var(--white);
  }
`;

export default FilterTasksStyles;
