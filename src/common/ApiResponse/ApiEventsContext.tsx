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
export type InitialApiEventsState = Iterable<readonly [string, ApiEvent]>;

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

export type ApiEventsProviderProps = {
  initialState?: InitialApiEventsState;
} & PropsWithChildren<{}>;

/**
 *
 * @param initialState - iterables to initialize the state
 * @param children
 * @returns
 */
export function ApiEventsProvider({
  children,
  initialState,
}: ApiEventsProviderProps) {
  const setupInitialState = (intialState?: InitialApiEventsState) => {
    return intialState instanceof ImmutableMap<string, ApiEvent>
      ? intialState
      : new ImmutableMap<string, ApiEvent>(intialState);
  };

  const [apiEvents, dispatchApiEvents] = useReducer(
    apiEventsReducer,
    setupInitialState(initialState)
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
