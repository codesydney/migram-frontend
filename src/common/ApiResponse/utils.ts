export function isErrorStatusCode(statusCode: number) {
  const firstDigit = Math.trunc(statusCode / 100);
  return firstDigit === 4 || firstDigit === 5;
}
