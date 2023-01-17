import { useEffect } from "react";
import { Session } from "next-auth";
import axios from "axios";

/**
 * Auto logins the User when they have a valid session.
 * Allows the user to refresh the page and stayed logged in.
 */
export const useSetAuthHeader = (session: Session | null) => {
  useEffect(() => {
    if (session && !axios.defaults.headers.common["authorization"]) {
      axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${session?.accessToken}`;
    }
  }, [session]);
};
