"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { ImmutableMap } from "map-immute";

import { ApiEvent } from "./types";

export type ApiEventsMap = ImmutableMap<string, ApiEvent>;
export type ApiEventsContextValues = {
  apiEvents: ApiEventsMap;
  setApiEvents: (apiEvents: ApiEventsMap) => void;
};

const ApiEventsContext = createContext<ApiEventsContextValues | undefined>(
  undefined
);

export function ApiEventsProvider({ children }: PropsWithChildren<{}>) {
  const [apiEvents, setApiEvents] = useState<ApiEventsMap>(
    () => new ImmutableMap<string, ApiEvent>()
  );

  return (
    <ApiEventsContext.Provider value={{ apiEvents, setApiEvents }}>
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
