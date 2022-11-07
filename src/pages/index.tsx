import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/legacy/image";
import { useSession } from "next-auth/client";
import axios from "axios";

import BodyStyles from "../components/styles/BodyStyles";
import ButtonStyles from "../components/styles/ButtonStyles";
import { useEffect } from "react";

const Home: NextPage = () => {
  const [session]: any = useSession();

  useEffect(() => {
    axios
      .get("/api/auth/session?update", { withCredentials: true })
      .then(() => {
        console.log("updated credentials!");
      });
  }, []);

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
          <h2>
            {session.user?.firstName
              ? `Welcome, ${session.user?.firstName}!`
              : `Welcome!`}
          </h2>
        ) : (
          <h2>migrant marketplace</h2>
        )}
        <p>
          Illawara Multicultural Services strive to provide equal and
          independant work opportunities for refugees and inmigrants. Support
          our community by creating jobs through this easy to use platform.
        </p>
        <div className="flex-container">
          <Link href="/tasks/createtask" passHref legacyBehavior>
            <ButtonStyles hidden={!session?.user}>Post a Job</ButtonStyles>
          </Link>
          {/* Commented by Engramar 24/08/2022     
            <ButtonStyles primary>Get started</ButtonStyles>
          */}
        </div>
      </div>
      <div className="secondary"></div>
    </BodyStyles>
  );
};

export default Home;
