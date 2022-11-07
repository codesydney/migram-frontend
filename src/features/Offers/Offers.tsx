import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";

import { Offer } from "./Offer";

const OffersStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export function Offers({ statusFilter, setSelectedTask, selectedTask }: any) {
  const { data: session, status }: any = useSession();
  const [offers, setOffers]: any = useState([]);

  useEffect(() => {
    // Get all tasks
    if (status === "loading") return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/offers`, {
        params: { my_offers: true, status: statusFilter },
        headers: {
          authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((response) => {
        setOffers(response.data.data.offers);

        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status, statusFilter, session?.accessToken]);

  useEffect(() => {
    for (let item in offers) {
      console.log("res", offers[item]);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${offers[item].task}`,
          {
            headers: {
              authorization: `Bearer ${session.accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log("task", response.data.data.task);
          // update offers state if status = paid
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [offers, session?.accessToken]);

  return (
    <OffersStyles>
      {offers.map((offer: any) => {
        // return <div key={offer._id}>{offer._id}</div>;
        return (
          <Offer
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            key={offer._id}
            offer={offer}
          />
        );
      })}
    </OffersStyles>
  );
}
