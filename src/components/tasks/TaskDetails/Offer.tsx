import Image from "next/legacy/image";
import { useSession } from "next-auth/client";

import UserIconStyles from "../../styles/UserIconStyles";
import ButtonStyles from "../../styles/ButtonStyles";
import axios from "axios";
import { useRouter } from "next/router";

import styled from "styled-components";

const StyledDiv = styled.div`
  border: 1px solid #c4c4c4;
  padding: 24px;
  margin-bottom: 32px;
  border-radius: 10px;
  font-weight: 200;
  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--lightGrey);
    align-items: center;
  }
`;

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
    <StyledDiv>
      <div className="header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <UserIconStyles>
            <Image width="40" height="40" src={offer?.photo} alt="Avatar" />
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
    </StyledDiv>
  );
}
