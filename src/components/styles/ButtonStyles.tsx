import styled, { css } from "styled-components";

interface ButtonProps {
  primary?: boolean;
  fullWidth?: boolean;
  inLine?: boolean;
}

const ButtonStyles = styled.button<ButtonProps>`
  height: 48px;
  min-width: 208px;
  background: white;
  padding: 12px;
  /* margin: 1rem; */
  border: 2px solid;
  line-height: 0;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  ${(props) =>
    props.primary &&
    css`
      border: var(--black);
      background: var(--black);
      color: var(--white);
      font-weight: 400;
    `}
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  ${(props) =>
    props.inLine &&
    css`
      margin-top: 1rem;
    `}
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default ButtonStyles;
