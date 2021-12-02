import Image from "next/image";

import axios from "axios";
import OfferStyles from "../styles/OfferStyles";
import UserIconStyles from "../styles/UserIconStyles";
import ButtonStyles from "../styles/ButtonStyles";
import { useSession } from "../../node_modules/next-auth/client";
import { useContext, useState } from "react";

export default function Offer({ offer }: any) {
  const [session, loading]: any = useSession();
  // const { selectedOffer, setSelectedOffer } = useState(null);

  console.log(offer);

  async function handleCompleteOffer() {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${offer.task}/completed`,
        {
          headers: {
            authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  if (!offer) {
    return <></>;
  }
  return (
    <OfferStyles>
      <div className="header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* <UserIconStyles>
            <Image width="48px" height="48px" src={offer?.photo} alt="Avatar" />
          </UserIconStyles> */}
          <div>
            {offer.firstName}{" "}
            {offer.providerId == session.user.providerId && "(You)"}
          </div>
        </div>

        <div className="offerAmt">${offer.offerAmt}</div>
      </div>
      <div className="body">{offer.comments}</div>
      <ButtonStyles onClick={handleCompleteOffer} style={{ marginTop: 24 }}>
        Mark as Completed
      </ButtonStyles>
    </OfferStyles>
  );
}
