"use client";

import { ElementsWrapper } from "./ElementsWrapper";
import { ApiEventsProvider } from "src/common/ApiResponse/ApiEventsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export function ClientProviders({ children }: PropsWithChildren<{}>) {
  return (
    <ElementsWrapper>
      <ApiEventsProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ApiEventsProvider>
    </ElementsWrapper>
  );
}
