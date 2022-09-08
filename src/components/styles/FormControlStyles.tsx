import styled from "styled-components";

const FormControlStyles = styled.div`
  .bar {
    width: 100%;
  }
  bottom: 0;
  /* position: absolute; */
  /* width: calc(100% - var(--side) - 50px); */
  margin-top: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  label {
    width: 100%;
    font-size: 16px;
    font-weight: 300;
  }
  button {
    color: var(--white);
    width: 48px;
    height: 48px;
    background: var(--black);
    border: 2px solid var(--black);
    border-radius: var(--border-radius);
    margin-left: 32px;
    padding: 12px;
    :hover {
      text-decoration: none;
    }
    :disabled {
      background: var(--lightGrey);
      color: var(--white);
      border-color: var(--lightGrey);
      :hover {
        cursor: default;
      }
    }
  }
`;

export default FormControlStyles;
