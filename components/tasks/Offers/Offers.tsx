import Offer from "./Offer";

export default function Offers({ offers, myTask }: any) {
  return (
    <>
      {offers.map((offer: any) => {
        return <Offer key={offer._id} offer={offer} myTask={myTask} />;
      })}
      <Offer />
    </>
  );
}
