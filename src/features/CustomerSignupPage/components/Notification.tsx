import { MdError, MdClose, MdCheckCircle } from "react-icons/md";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;

  p {
    margin: 0;
  }

  .contents {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: 2px;
    width: 100%;

    & > * {
      display: inline-block;
      font-size: 0.875rem;
      height: 100%;
    }

    .message {
      width: 100%;
      align-self: center;

      .title {
        font-weight: 600;
      }
    }

    svg {
      display: block;
      width: 24px;
      height: 24px;
      margin-bottom: auto;
    }
  }

  .success {
    --main-color: #1dc455;
    --secondary-color: #ddf8e6;
    background-color: var(--secondary-color);
    border-left: 4px solid var(--main-color);

    svg {
      color: var(--main-color);
    }
  }

  .error {
    --main-color: #da1e28;
    --secondary-color: #f8dddf;
    background-color: var(--secondary-color);
    border-left: 4px solid var(--main-color);

    svg {
      color: var(--main-color);
    }
  }

  @media (min-width: 768px) {
    left: auto;
    bottom: 1rem;
    margin-inline: auto;
    padding: 0;
    max-width: 500px;
    font-size: 1rem;
  }
`;

interface NotificationProps {
  title: string;
  message: string;
  handleClose: () => void;
}

export const ErrorNotification = ({
  title = "Email is already in use.",
  message = "Please use a different email.",
  handleClose,
}: NotificationProps) => {
  return (
    <StyledDiv className="notification">
      <div className="contents error">
        <div className="left-icon">
          <MdError />
        </div>
        <div className="message">
          <p className="title">{`Error: ${title}`}</p>
          <p className="subtitle">{message}</p>
        </div>
        <div className="right-icon">
          <MdClose onClick={handleClose} />
        </div>
      </div>
    </StyledDiv>
  );
};

export const SuccessNotification = ({
  title,
  message,
  handleClose,
}: NotificationProps) => {
  return (
    <StyledDiv className="notification">
      <div className="contents success">
        <div className="left-icon">
          <MdCheckCircle />
        </div>
        <div className="message">
          <p className="title">{`Success: ${title}`}</p>
          <p className="message-body">{message}</p>
        </div>
        <div className="right-icon">
          <MdClose onClick={handleClose} />
        </div>
      </div>
    </StyledDiv>
  );
};
