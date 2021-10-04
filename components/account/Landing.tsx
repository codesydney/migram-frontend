import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

import ButtonStyles from "../styles/ButtonStyles";
import BodyStyles from "../styles/BodyStyles";

export default function Landing() {
  const [session, loading]: any = useSession();

  return (
    <BodyStyles>
      <div className="primary">
        {session ? (
          <h2>{`Welcome, ${session.user?.firstName}!`}</h2>
        ) : (
          <h2>Lorem ipsum dolor sit amet, consectetur</h2>
        )}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis
        </p>
        <div className="flex-container">
          <Link href="/createtask" passHref>
            <ButtonStyles>Post a Job</ButtonStyles>
          </Link>
          <ButtonStyles primary>Get started</ButtonStyles>
        </div>
      </div>
      <div className="secondary"></div>
    </BodyStyles>
  );
}
