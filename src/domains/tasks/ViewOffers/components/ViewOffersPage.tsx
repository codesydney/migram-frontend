export function ViewOffersPage({
  status,
}: {
  status: "authenticated" | "loading" | "unauthenticated";
}) {
  console.log(status);
  return <div aria-label="View Offers Page"></div>;
}
