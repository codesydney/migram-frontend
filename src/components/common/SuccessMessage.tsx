import styled from "styled-components";

const SuccessMessageStyle = styled.div`
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
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

function SuccessMessage({ message }: { message: string }) {
  return (
    <SuccessMessageStyle>
      <div className="success-message">{message}</div>
    </SuccessMessageStyle>
  );
}

export default SuccessMessage;
