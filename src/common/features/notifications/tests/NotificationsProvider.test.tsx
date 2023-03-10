/**
 * This file contains tests only to validate if the initial state prop is working.
 *
 * Otherwise, do not test this Provider directly. Instead, test this by proxy via the Components that use it.
 *
 * The user cannot see the ApiEventsProvider, which will make this an implementation detail.
 */
import { render } from "@testing-library/react";

import {
  NotificationsProvider,
  InitialNotificationsState,
} from "../hooks/NotificationsContext";
import { ImmutableMap } from "map-immute";
import { Notification } from "../types";

function setupRender(initialState: InitialNotificationsState) {
  return render(<NotificationsProvider initialState={initialState} />);
}

it("throws an error when an invalid initalState is provided", () => {
  const initialState: any = {};

  expect(() => setupRender(initialState)).toThrow();
});

test("does not throw error when initialState is not provided", () => {
  expect(setupRender).not.toThrow();
});

it("allows an ImmutableMap<string, ApiEvent> as the  initialState", () => {
  const initialState = new ImmutableMap<string, Notification>();

  expect(() => setupRender(initialState)).not.toThrow();
});

it("allows a Map<string, ApiEvent> as the initialState", () => {
  const initialState = new Map<string, Notification>();

  expect(() => setupRender(initialState)).not.toThrow();
});

it("allows an Array<[string, ApiEvent]> as the initialState", () => {
  const initialState = new Array<[string, Notification]>();

  expect(() => setupRender(initialState)).not.toThrow();
});
