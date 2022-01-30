import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/client";

import ButtonStyles from "../styles/ButtonStyles";
import BodyStyles from "../styles/BodyStyles";

export default function Landing() {
  const [session, loading]: any = useSession();

  return (
    <BodyStyles>
      <div className="primary">
        <div style={{ paddingBottom: "32px", WebkitFilter: "grayscale(1)" }}>
          <Image
            width={152.5}
            height={109}
            alt={"IMS Logo"}
            src={
              "https://www.ims.org.au/wp-content/uploads/2020/04/IMS-Log-cut-1536x1100.png"
            }
          />
        </div>
        {session ? (
          <h2>{`Welcome, ${session.user?.firstName}!`}</h2>
        ) : (
          <h2>Illawarra Multicultural Services</h2>
        )}
        <p>
          Continuous support and advocacy for culturally diverse communities
          from migrant and refugee backgrounds.
        </p>
        <div className="flex-container">
          <Link href="/tasks/createtask" passHref>
            <ButtonStyles>Post a Job</ButtonStyles>
          </Link>
          <ButtonStyles primary>Get started</ButtonStyles>
        </div>
      </div>
      <div className="secondary"></div>
    </BodyStyles>
  );
}
