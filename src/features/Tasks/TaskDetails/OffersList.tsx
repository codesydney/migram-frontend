import { Offer } from "./Offer";

export function OffersList({ offers, myTask }: any) {
  return (
    <>
      {offers.map((offer: any) => {
        return <Offer key={offer._id} offer={offer} myTask={myTask} />;
      })}
      <Offer />
    </>
  );
}
