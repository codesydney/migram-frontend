import styled from "styled-components";

const StyledDiv = styled.div`
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

export function FilterOffers({ status, setStatus }: any) {
  return (
    <StyledDiv>
      <button disabled={status == ""} onClick={() => setStatus("")}>
        all
      </button>
      <button disabled={status == "open"} onClick={() => setStatus("open")}>
        open
      </button>
      <button
        disabled={status == "accepted"}
        onClick={() => setStatus("accepted")}
      >
        accepted
      </button>
      <button>completed</button>
    </StyledDiv>
  );
}
