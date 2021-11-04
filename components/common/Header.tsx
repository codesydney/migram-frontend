import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Nav from "./Nav";

// TODO: Style logo for responsiveness (toggle smaller logo)
const LogoStyles = styled.div`
  padding-right: var(--side);
  :hover {
    cursor: pointer;
  }
`;

const HeaderStyles = styled.header`
  height: 80px;
  border-bottom: 1px solid var(--lightGrey);
  margin-bottom: 3em;
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Header() {
  return (
    <HeaderStyles>
      <Link href="/" passHref>
        <LogoStyles>
          <Image src="/logo.png" alt="Migram" width="174.6" height="48" />
        </LogoStyles>
      </Link>
      <Nav />
    </HeaderStyles>
  );
}
