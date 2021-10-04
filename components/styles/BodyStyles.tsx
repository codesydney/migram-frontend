import styled, { css } from "styled-components";

interface ButtonProps {
  alternate: any;
}

const BodyStyles = styled.div<Pick<ButtonProps, any>>`
  display: grid;
  @media only screen and (max-width: 900px) {
    grid-template-columns: 100%;
    .secondary {
      padding-top: 144px;

      min-height: 672px;
    }
  }
  @media only screen and (min-width: 900px) {
    min-height: 844px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    .primary {
      padding-top: 168px;
    }
    .form-header {
      min-height: 230px;
    }
  }
  .primary {
    padding-left: var(--side);
    padding-right: 50px;
    border-top-right-radius: 75px;
  }
  .secondary {
    padding-right: var(--side);
    padding-left: 50px;
    @media only screen and (max-width: 900px) {
      margin-left: 5vw;
    }
    background: var(--lightGrey);
    border-top-left-radius: 75px;
  }
  ${(props) =>
    props.alternate &&
    css`
      .primary {
        background: var(--lightGrey);
      }
      .secondary {
        background: var(--white);
      }
    `}

  .flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 2rem;
    margin-bottom: 1rem;
  }
`;

export default BodyStyles;
