import { useState, useEffect } from "react";
import { createPaymentIntent } from "../api";

type SetIsLoading = (value: boolean) => void;

export const useCreatePaymentIntent = (
  taskId: string,
  setIsLoading: SetIsLoading
) => {
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!clientSecret && taskId) {
      setIsLoading(true);

      createPaymentIntent(taskId).then((response) => {
        setClientSecret(response.data?.client_secret);
        setIsLoading(false);
      });
    }
  }, [clientSecret, setIsLoading, taskId]);

  return { clientSecret };
};
