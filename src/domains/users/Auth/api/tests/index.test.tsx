import axios from "axios";
import { Session } from "next-auth";

import { deleteAuthHeader, setAuthHeader } from "..";

describe("setAuthHeader util", () => {
  beforeEach(() => {
    deleteAuthHeader();
  });

  afterEach(() => {
    deleteAuthHeader();
  });

  test("does not axios auth header when session is null", async () => {
    const testInput = null;
    await setAuthHeader(testInput);

    expect(axios.defaults.headers.common["authorization"]).toBeUndefined();
  });

  test("sets axios auth header", async () => {
    const testInput = { accessToken: "testToken" } as Session;

    await setAuthHeader(testInput);

    expect(axios.defaults.headers.common["authorization"]).toBe(
      "Bearer testToken"
    );
  });
});
