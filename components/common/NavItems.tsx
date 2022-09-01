import Link from "next/link";
import { useSession } from "next-auth/client";
import styled from "styled-components";

import ButtonStyles from "../styles/ButtonStyles";

interface NavProps {
  isNavBarOpen: Boolean;
}

const NavStyles = styled.ul<Pick<NavProps, any>>`
  display: flex;
  justify-content: space-between;
  justify-self: end;
  align-items: center;
  font-weight: 500;
  text-transform: lowercase;
  a {
    margin: 0 1rem;
  }
  button {
    margin: 0 1rem;
  }
  @media (max-width: 820px) {
    padding: 0px;
    width: 100vw;
    position: absolute;
    top: 70%;
    left: 0;
    display: flex;
    // display: ${({ isNavBarOpen }) => (isNavBarOpen ? "flex" : "none")};
    flex-direction: column;
    overflow: hidden;
    max-height: ${({ isNavBarOpen }) => (isNavBarOpen ? "1000px" : "0")};
    transition: max-height 0.5s;
    justify-content: space-evenly;
    background: white;
    // border: 1px solid #c4c4c4;
    box-shadow: var(--bs);
    border-radius: var(--border-radius);
    a {
      padding: 12px;
      margin: 1rem;
      text-align: center;
      border-radius: var(--border-radius);
      transition: background-color 0.5s;
    }
    a:hover {
      background-color: var(--lightGrey);
      text-decoration: none;
    }
    button {
      margin: 1rem;
    }
  }
`;

export default function Nav(props: any) {
  const [session, loading]: any = useSession();

  console.log(session);

  return (
    <NavStyles isNavBarOpen={props.isNavBarOpen}>
      {loading && <></>}
      {/* If ANY user is logged in */}
      {session && (
        <>
          {session.user.providerId && (
            <Link href="/offers">
              <a onClick={() => props.closeNavBar()}>My Offers</a>
            </Link>
          )}
          {session.user.customerId && (
            <>
              <Link href="/tasks/createtask">
                <a onClick={() => props.closeNavBar()}>
                  <button>Create Task</button>
                </a>
              </Link>
              <Link href="/mytasks">
                <a onClick={() => props.closeNavBar()}>My Tasks</a>
              </Link>
            </>
          )}
          <Link href="/tasks">Browse Tasks</Link>
        </>
      )}
      {!session && !loading && (
        <>
          <Link href="/login" passHref>
            <ButtonStyles onClick={() => props.closeNavBar()}>
              Login
            </ButtonStyles>
          </Link>
          <Link href="/signup" passHref>
            <ButtonStyles primary onClick={() => props.closeNavBar()}>
              Sign up
            </ButtonStyles>
          </Link>
        </>
      )}
    </NavStyles>
  );
}
