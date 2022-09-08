import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession, signOut } from "next-auth/client";
import styled from "styled-components";

import UserIconStyles from "../styles/UserIconStyles";
import DropDownStyles from "../styles/DropDownStyles";

const PositionRelative = styled.div`
  font-weight: 500;
  text-transform: lowercase;
  position:relative;
`;

const HideLink = styled.a`
  @media(min-width:950px){
    display:none
  }
`

export default function UserIcon(props: any) {
  const [session, loading]: any = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  console.log(session);

  async function handleSignout(e: any) {
    e.preventDefault();
    const data: any = await signOut({ redirect: false, callbackUrl: "/login" });
    if (data.url) {
      router.push(data.url);
    }
  }

  return (
    <PositionRelative>
      {loading && <></>}
      {/* If ANY user is logged in */}
      {session && (
        <>
          <UserIconStyles onClick={() => setIsOpen(!isOpen)}>
            {/* TODO: Remove/change placeholder */}
            {session.user.photo ? (
              <Image
                width="48px"
                height="48px"
                src={session.user.photo}
                alt="Avatar"
              />
            ) : (
              <Image
                width="48px"
                height="48px"
                // src={`${process.env.NEXT_PUBLIC_API_URL}${session.user.photo}`}
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Avatar"
              />
            )}
          </UserIconStyles>
          {isOpen && (
            <DropDownStyles>
              <Link href="/account" passHref>
                <a onClick={() => setIsOpen(false)}>Account</a>
              </Link>
              <a
                onClick={(e) => {
                  setIsOpen(false);
                  handleSignout(e);
                }}
              >
                Logout
              </a>
            </DropDownStyles>
          )}
        </>
      )}
    </PositionRelative>
  );
}
