"use client";

import { NotificationsProvider } from "src/common/features/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export function ClientProviders({ children }: PropsWithChildren<{}>) {
  return (
    <NotificationsProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NotificationsProvider>
  );
}
