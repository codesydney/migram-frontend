import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { useSession, signOut } from "next-auth/react";
import styled from "styled-components";

import UserIconStyles from "../styles/UserIconStyles";
import DropDownStyles from "../styles/DropDownStyles";

const PositionRelative = styled.div`
  font-weight: 500;
  text-transform: lowercase;
  position: relative;
`;

const HideLink = styled.a`
  @media (min-width: 950px) {
    display: none;
  }
`;

export default function UserIcon(props: any) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function handleSignout(e: any) {
    e.preventDefault();
    const data: any = await signOut({ redirect: false, callbackUrl: "/login" });
    if (data.url) {
      router.push(data.url);
    }
  }

  return (
    <PositionRelative>
      {status === "loading" && <></>}
      {/* If ANY user is logged in */}
      {session && (
        <>
          <UserIconStyles onClick={() => setIsOpen(!isOpen)}>
            {/* TODO: Remove/change placeholder */}
            {session?.user?.photo ? (
              <Image
                width="40"
                height="40"
                src={session?.user?.photo}
                alt="Avatar"
              />
            ) : (
              <Image
                width="40"
                height="40"
                // src={`${process.env.NEXT_PUBLIC_API_URL}${session.user.photo}`}
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Avatar"
              />
            )}
          </UserIconStyles>
          {isOpen && (
            <DropDownStyles>
              <Link href="/account" passHref onClick={() => setIsOpen(false)}>
                Account
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
