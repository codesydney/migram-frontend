import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ListingsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return <></>;
}
