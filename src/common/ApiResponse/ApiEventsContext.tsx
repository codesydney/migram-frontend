"use client";

import { PropsWithChildren, createContext, useContext } from "react";
import { ImmutableMap } from "map-immute";

import { ApiEvent } from "./types";

export type ApiEventsMap = ImmutableMap<string, ApiEvent>;

const ApiEventsContext = createContext<ApiEventsMap | undefined>(undefined);

export function ApiEventsProvider({ children }: PropsWithChildren<{}>) {
  return (
    <ApiEventsContext.Provider value={new ImmutableMap<string, ApiEvent>()}>
      {children}
    </ApiEventsContext.Provider>
  );
}

export function useApiEvents() {
  const context = useContext(ApiEventsContext);

  if (!context) {
    throw new Error("useApiEvents must be used within ApiEventsProvider");
  }

  return context;
}
