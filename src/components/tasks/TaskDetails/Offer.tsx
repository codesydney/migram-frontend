import Image from "next/image";
import TaskOfferStyles from "../../styles/TaskOfferStyles";
import { useSession } from "next-auth/client";

import UserIconStyles from "../../styles/UserIconStyles";
import ButtonStyles from "../../styles/ButtonStyles";
import axios from "axios";
import { useRouter } from "next/router";

export default function Offer({ offer, myTask }: any) {
  const [session, loading]: any = useSession();
  const router = useRouter();

  // console.log(offer);

  async function handleAcceptOffer() {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/acceptoffer/`,
        {
          taskId: offer.task,
          offerId: offer.id,
        },
        {
          // params: { my_tasks: true },
          headers: {
            authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        router.push("/mytasks");
      })
      .catch((error) => console.log(error));
  }

  if (!offer) {
    return <></>;
  }
  return (
    <TaskOfferStyles>
      <div className="header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <UserIconStyles>
            <Image width="48px" height="48px" src={offer?.photo} alt="Avatar" />
          </UserIconStyles>
          <div>
            {offer.firstName}{" "}
            {offer.providerId == session.user.providerId && "(You)"}
          </div>
        </div>

        <div className="offerAmt">${offer.offerAmt}</div>
      </div>
      <div className="body">{offer.comments}</div>
      {myTask && (
        <ButtonStyles onClick={handleAcceptOffer} style={{ marginTop: 24 }}>
          Accept Offer
        </ButtonStyles>
      )}
    </TaskOfferStyles>
  );
}
