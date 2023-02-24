import { isErrorStatusCode } from "../../utils";

type TestCases = { code: number; expected: boolean }[];

const testCases: TestCases = [
  { code: 200, expected: false },
  { code: 201, expected: false },
  { code: 204, expected: false },
  { code: 400, expected: true },
  { code: 401, expected: true },
  { code: 403, expected: true },
  { code: 500, expected: true },
];

it.each(testCases)("returns $expected for HTTP $code", ({ code, expected }) => {
  expect(isErrorStatusCode(code)).toBe(expected);
});
