import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import NavItems from "./NavItems";
import UserIcon from "./UserIcon";
import { useState } from "react";

// TODO: Style logo for responsiveness (toggle smaller logo)
const LogoStyles = styled.div`
  padding-right: var(--side);
  :hover {
    cursor: pointer;
  }
  display: inline;
`;

const HeaderStyles = styled.header`
  margin: 0.5rem 0 0.5rem 0;
  min-height: 77px;
  border-bottom: 1px solid var(--lightGrey);
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
<<<<<<< HEAD
  z-index: 1;
=======
  z-index: 100;
>>>>>>> 71824b7aaea7da12dcafbbf661e4d659b0b1f19a
`;

const HamburgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-left: 1.5rem;

  span {
    height: 2px;
    width: 25px;
    background-color: var(--black);
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (min-width: 820px) {
    display: none;
  }
`;

const NavBarIconGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function Header() {
  const [isNavBarOpen, setIsNavBarOpen]: any = useState(false);

  const closeNavBar = () => {
    setIsNavBarOpen(false);
  };

  return (
    <HeaderStyles>
      <Link href="/" passHref>
        <LogoStyles>
          <Image src="/logo.png" alt="Migram" width="174.6" height="48" />
        </LogoStyles>
      </Link>
      <FlexRow>
        <NavItems isNavBarOpen={isNavBarOpen} closeNavBar={closeNavBar} />
        <NavBarIconGroup>
          <UserIcon />
          <HamburgerIcon onClick={() => setIsNavBarOpen(!isNavBarOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerIcon>
        </NavBarIconGroup>
      </FlexRow>
    </HeaderStyles>
  );
}
