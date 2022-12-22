import fetch from "node-fetch";

const url = `${process.env.NEXT_PUBLIC_API_URL}api/v1/releasePayment`;

export const createPaymentIntent = async (taskId: string) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId }),
  });

  const data = response.json();

  return data;
};
