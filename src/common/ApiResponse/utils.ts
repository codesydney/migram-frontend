export function isErrorStatusCode(statusCode: number) {
  return Math.trunc(statusCode / 100) !== 2;
}
