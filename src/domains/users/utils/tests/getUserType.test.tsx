import { User } from "next-auth";
import { getUserType } from "..";

test("returns 'USER' when the user is does not have either a customerId or a providerId", () => {
  const input = {} as User;

  const result = getUserType(input);

  expect(result).toBe("USER");
});

test("returns 'CUSTOMER' when the user has a customerId", () => {
  const input = { customerId: "test" } as User;

  const result = getUserType(input);

  expect(result).toBe("CUSTOMER");
});

test("returns 'PROVIDER' when the user has a providerId", () => {
  const input = { providerId: "test" } as User;

  const result = getUserType(input);

  expect(result).toBe("PROVIDER");
});
