import axios from "axios";
import { MakeAnOfferFormState } from "../types";

export const createOffer = async (
  taskId: string,
  { offerAmt, comments }: MakeAnOfferFormState
) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${taskId}/offers`,
    {
      offerAmt,
      comments,
    }
  );
};
