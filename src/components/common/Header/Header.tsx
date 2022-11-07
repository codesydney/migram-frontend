import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import styled from "styled-components";

import { HamburgerMenu } from "./HamburgerMenu";
import { NavMenu } from "./NavMenu";

const StyledHeader = styled.header`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap");
  font-family: "Poppins", sans-serif;

  margin: 1rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  line-height: 1.5;

  .logo {
    z-index: 101;
    display: inline-flex;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }

  @media (max-width: 767px) {
    .hidden {
      display: none;
    }
  }
`;

export const Header = () => {
  const [hamburgerActive, setHamburgerActive] = useState(false);

  const toggleActive = () => setHamburgerActive(!hamburgerActive);

  return (
    <StyledHeader>
      <div className="logo">
        <Link href="/" passHref={true} legacyBehavior>
          <Image src="/logo.png" alt="Migram" width="116" height="32" />
        </Link>
      </div>
      <HamburgerMenu active={hamburgerActive} toggleActive={toggleActive} />
      <NavMenu
        className={hamburgerActive ? "" : "hidden"}
        setHamburgerActive={setHamburgerActive}
      />
    </StyledHeader>
  );
};
