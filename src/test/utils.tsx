import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { PolarisTestProvider } from "@shopify/polaris";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const QueryClientWrapper = ({ children }: PropsWithChildren<{}>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export const renderWithPolarisTestProvider = (ui: React.ReactElement) => {
  return render(ui, { wrapper: PolarisTestProvider });
};
