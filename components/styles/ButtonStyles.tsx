import styled, { css } from "styled-components";

interface ButtonProps {
  primary: any;
  fullWidth: any;
  inLine: any;
}

const ButtonStyles = styled.button<Pick<ButtonProps, any>>`
  height: 48px;
  min-width: 208px;
  background: white;
  padding: 12px;
  /* margin: 1rem; */
  border: 2px solid;
  line-height: 0;
  border-radius: var(--border-radius);
  font-weight: 500;
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
      /* margin-left: 1rem;
      margin-right: 1rem; */
      margin-top: 1rem;
    `}
  &[disabled] {
    opacity: 0.5;
  }
`;

export default ButtonStyles;
