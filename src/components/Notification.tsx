import { Layout, Banner } from "@shopify/polaris";

export function BaseNotification() {
  return (
    <Layout.Section fullWidth>
      <Banner status="critical" onDismiss={() => {}}>
        <p>
          Use your finance report to get detailed information about your
          business.
        </p>
      </Banner>
    </Layout.Section>
  );
}
