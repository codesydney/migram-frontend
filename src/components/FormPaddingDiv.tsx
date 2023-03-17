import styled from "styled-components";

/**
 * Adds some padding on mobile viewports,
 * Otherwise the forms will go up to the edges of the screen.
 */
export const FormPaddingDiv = styled.div`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 0;
  }
`;
