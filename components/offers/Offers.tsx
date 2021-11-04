import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "../../node_modules/next-auth/client";

import BodyStyles from "../styles/BodyStyles";
import Offer from "./Offer";

export default function Offers() {
  const [session, loading]: any = useSession();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Get all tasks
    if (loading) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/offers`, {
        params: { my_offers: true, status: "accepted" },
        headers: {
          authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        setOffers(response.data.data.offers);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  return (
    <BodyStyles dashboard>
      <div className="primary">
        {offers.map((offer: any) => {
          // return <div key={offer._id}>{offer._id}</div>;
          return <Offer key={offer._id} offer={offer} />;
        })}
      </div>
      <div className="secondary">Task</div>
    </BodyStyles>
  );
}
