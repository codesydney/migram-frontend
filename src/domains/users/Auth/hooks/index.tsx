import { useEffect } from "react";
import { Session } from "next-auth";
import { setAuthHeader } from "../api";

/**
 * Auto logins the User when they have a valid session.
 * Allows the user to refresh the page and stayed logged in.
 */
export const useSetAuthHeader = (session: Session | null) => {
  useEffect(() => {
    setAuthHeader(session);
  }, [session]);
};
