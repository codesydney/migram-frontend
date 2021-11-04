import styled, { css } from "styled-components";

interface ButtonProps {
  alternate: any;
  dashboard: any;
}

const BodyStyles = styled.div<Pick<ButtonProps, any>>`
  display: grid;
  .primary {
    padding-left: var(--side);
    padding-right: 50px;
    border-top-right-radius: 75px;
  }
  .secondary {
    position: relative;
    padding-right: var(--side);
    padding-left: 50px;
    @media only screen and (max-width: 900px) {
      margin-left: 5vw;
    }
    background: var(--lightGrey);
    border-top-left-radius: 75px;
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
  @media only screen and (max-width: 900px) {
    grid-template-columns: 100%;
    .primary {
      margin: 0px;
      padding: 6px var(--side);
    }
    .secondary {
      margin: 0px;
      padding: 6px var(--side);
      margin-left: 0px;
      min-height: 672px;
    }
    .form-header {
      min-height: 72px;
    }
  }
  ${(props) =>
    props.alternate &&
    css`
      @media only screen and (min-width: 900px) {
        .primary {
          background: var(--lightGrey);
        }
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

  ${(props) =>
    props.dashboard &&
    css`
      .primary {
        padding-top: 0;
      }
      .secondary {
        background: var(--white);
        box-shadow: var(--bs);
        border: 1px solid var(--lightGrey);
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
