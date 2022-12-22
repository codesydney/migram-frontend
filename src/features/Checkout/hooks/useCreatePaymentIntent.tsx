import { useState, useEffect } from "react";
import { createPaymentIntent } from "../api";

export const useCreatePaymentIntent = (taskId: string) => {
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!clientSecret && taskId) {
      createPaymentIntent(taskId).then((response) => {
        setClientSecret(response.data?.client_secret);
      });
    }
  }, [clientSecret, taskId]);

  return { clientSecret };
};
