import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";

import UserIcon from "../UserIcon";
import { NavItems } from "./NavItems";

const StyledNavMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 100;
  font-weight: 500;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  padding-top: 5rem;
  background-color: #ffffff;

  @media (max-width: 767px) {
    li {
      height: 2.5rem;
    }
  }

  @media (min-width: 768px) {
    position: static;
    top: auto;
    left: auto;
    width: auto;
    height: auto;
    padding-top: 0;

    display: inline-flex;
    flex-direction: row;
    gap: 3rem;
  }
`;

interface StyledNavMenuProps {
  className: string;
  setHamburgerActive: Dispatch<SetStateAction<boolean>>;
}

export const NavMenu = ({
  className,
  setHamburgerActive,
}: StyledNavMenuProps) => {
  const { data: session } = useSession();

  const handleMenuItemClick = () => {
    setHamburgerActive(false);
  };

  return (
    <StyledNavMenu className={`navMenu ${className}`}>
      <NavItems onClick={handleMenuItemClick} />
      {session && <UserIcon />}
    </StyledNavMenu>
  );
};
