"use client";

import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import { ImmutableMap } from "map-immute";

import { ApiEvent as Notification } from "./types";

export type NotifcationsMap = ImmutableMap<string, Notification>;
export type InitialNotificationsState = Iterable<
  readonly [string, Notification]
>;

export type NotificationsAction =
  | {
      type: "set";
      event: Notification;
    }
  | {
      type: "delete";
      id: string;
    }
  | {
      type: "clear";
    };

export function notificationsReducer(
  state: NotifcationsMap,
  action: NotificationsAction
): NotifcationsMap {
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

export type NotificationsContextValues = {
  apiEvents: NotifcationsMap;
  dispatchApiEvents: Dispatch<NotificationsAction>;
};

const NotificationsContext = createContext<
  NotificationsContextValues | undefined
>(undefined);

export type NotificationsProviderProps = {
  initialState?: InitialNotificationsState;
} & PropsWithChildren<{}>;

function setupInitialState(intialState?: InitialNotificationsState) {
  return intialState instanceof ImmutableMap<string, Notification>
    ? intialState
    : new ImmutableMap<string, Notification>(intialState);
}

/**
 *
 * @param initialState - iterables to initialize the state
 * @param children
 * @returns
 */
export function NotificationsProvider({
  children,
  initialState,
}: NotificationsProviderProps) {
  const [notifications, dispatchNotifications] = useReducer(
    notificationsReducer,
    setupInitialState(initialState)
  );

  return (
    <NotificationsContext.Provider
      value={{
        apiEvents: notifications,
        dispatchApiEvents: dispatchNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within NotificationsProvider"
    );
  }

  return context;
}
