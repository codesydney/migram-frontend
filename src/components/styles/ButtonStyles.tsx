import styled, { css } from "styled-components";

interface ButtonProps {
  primary?: boolean;
  fullWidth?: boolean;
  inLine?: boolean;
}

const ButtonStyles = styled.button<ButtonProps>`
  min-width: 160px;
  height: 3rem;
  background: white;
  padding: 0.5rem 0.75rem;
  border: 2px solid;
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: 500;
  border-radius: var(--border-radius);

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
