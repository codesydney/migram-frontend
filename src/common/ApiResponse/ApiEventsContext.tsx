"use client";

import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import { ImmutableMap } from "map-immute";

import { ApiEvent } from "./types";

export type ApiEventsMap = ImmutableMap<string, ApiEvent>;

export type ApiEventAction =
  | {
      type: "set";
      event: ApiEvent;
    }
  | {
      type: "delete";
      id: string;
    }
  | {
      type: "clear";
    };

export function apiEventsReducer(
  state: ApiEventsMap,
  action: ApiEventAction
): ApiEventsMap {
  switch (action.type) {
    case "set":
      return state.set(action.event.id, action.event);
    case "delete":
      const result = state.safeDelete(action.id);
      if (!result) return state;
      return result;
    case "clear":
      return state.safeClear();
    default:
      return state;
  }
}

export type ApiEventsContextValues = {
  apiEvents: ApiEventsMap;
  dispatchApiEvents: Dispatch<ApiEventAction>;
};

const ApiEventsContext = createContext<ApiEventsContextValues | undefined>(
  undefined
);

const testEvents = [
  [
    "1",
    {
      id: "1",
      isError: true,
      title: "string",
      status: 400,
      statusText: "Bad Request",
    },
  ],
  [
    "2",
    {
      id: "2",
      isError: true,
      title: "Event Two",
      status: 400,
      statusText: "Bad Request",
    },
  ],
] as const;

export type ApiEventsProviderProps = {
  initialState?: ApiEventsMap;
} & PropsWithChildren<{}>;

export function ApiEventsProvider({
  children,
  initialState = new ImmutableMap<string, ApiEvent>(testEvents),
}: ApiEventsProviderProps) {
  const [apiEvents, dispatchApiEvents] = useReducer(
    apiEventsReducer,
    initialState
  );

  return (
    <ApiEventsContext.Provider value={{ apiEvents, dispatchApiEvents }}>
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
