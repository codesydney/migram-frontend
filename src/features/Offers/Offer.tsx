import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSession } from "next-auth/react";
import OfferStyles from "./OfferStyles";

export function Offer({ offer, setSelectedTask, selectedTask }: any) {
  const { data: session }: any = useSession();
  // const { selectedOffer, setSelectedOffer } = useState(null);

  console.log("OFFER", offer);
  console.log("SELECTED TASK", selectedTask);

  async function handleCompleteOffer() {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${offer.task}/completed`,
        {},
        {
          headers: {
            authorization: `Bearer ${session?.accessToken}`,
          },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <OfferStyles
      onClick={async () => {
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${offer.task}`, {
            headers: {
              authorization: `Bearer ${session?.accessToken}`,
            },
          })
          .then((response) => {
            console.log(response);
            setSelectedTask(response.data.data.task);
          })
          .catch((error) => {
            console.log(error);
          });
      }}
      selected={selectedTask?.id == offer.task}
    >
      <div className="header">
        <div className="icon"></div>
        <div className="category">{offer.status}</div>
      </div>
      <div className="body">
        <p>{offer.comments}</p>
      </div>
      <div className="footer">
        <div>
          Your offer:
          <div className="price">
            <div className="icon">
              <FontAwesomeIcon icon={faDollarSign} color={"black"} />
            </div>
            {offer.offerAmt.toFixed(2)}
          </div>
        </div>
        {offer.status == "accepted" && (
          <button onClick={handleCompleteOffer} style={{ marginTop: 24 }}>
            Mark as Completed
          </button>
        )}
      </div>
    </OfferStyles>
  );
}
