import styled from "styled-components";
import { MdMenu, MdClose } from "react-icons/md";

const StyledHamburger = styled.div`
  display: inline-flex;
  justify-content: end;
  z-index: 101;

  @media (min-width: 768px) {
    display: none;
  }
`;

interface HamburgerMenuProps {
  active: boolean;
  toggleActive: () => void;
}

export const HamburgerMenu = ({ active, toggleActive }: HamburgerMenuProps) => {
  return (
    <StyledHamburger className="hamburgerMenu" onClick={toggleActive}>
      {active ? <MdClose /> : <MdMenu />}
    </StyledHamburger>
  );
};
