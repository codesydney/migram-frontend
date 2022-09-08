import styled from "styled-components";

const ErrorMessageStyle = styled.div`
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  font-size: 1.2rem;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: 0.25rem;
`;

function ErrorMessage(props: any) {
  return (
    <ErrorMessageStyle>
      <div className="error-message">{props.message}</div>
    </ErrorMessageStyle>
  );
}

export default ErrorMessage;
