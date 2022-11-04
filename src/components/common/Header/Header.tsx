import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import styled from "styled-components";

import { HamburgerMenu } from "./HamburgerMenu";
import { NavMenu } from "./NavMenu";
import { useSession } from "next-auth/client";
import { defaultMenu, determineNavItems } from "./utils";

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

  button {
    font-family: "Poppins", sans-serif;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    text-transform: none;
    border-radius: 50px;
    background-color: black;
    color: white;
    border: none;
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

  @media (min-width: 768px) {
    margin: 2rem;
  }
`;

export const Header = () => {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [menuItems, setMenuItems] = useState(defaultMenu);
  const [session] = useSession();

  const toggleActive = () => setHamburgerActive(!hamburgerActive);

  useEffect(() => {
    setMenuItems(determineNavItems(session));
  }, [session]);

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
        menuItems={menuItems}
        setHamburgerActive={setHamburgerActive}
      />
    </StyledHeader>
  );
};
