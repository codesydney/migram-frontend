import styled, { css } from "styled-components";

const UserIconStyles = styled.div`
  :hover {
    cursor: pointer;
  }
  display: block;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  border: 1px solid var(--darkGrey);
  img {
    border-radius: 50%;
  }
`;

export default UserIconStyles;
