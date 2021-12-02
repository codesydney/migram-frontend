import styled from "styled-components";

const PaginationStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  .page-change {
    align-self: center;
    place-self: center;
    :hover {
      cursor: pointer;
    }
  }

  button {
    background: none;
    border: none;
  }
`;

export default PaginationStyles;
