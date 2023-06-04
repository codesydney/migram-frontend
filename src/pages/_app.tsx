import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

import "../globals.css";
import { OnboardUserModal } from "@/components/OnboardUserModal";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <Header />
      <OnboardUserModal />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
