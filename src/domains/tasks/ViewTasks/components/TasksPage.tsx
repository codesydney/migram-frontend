import {
  Button,
  Card,
  IndexTable,
  Stack,
  Text,
  TextContainer,
} from "@shopify/polaris";
import { useState } from "react";

const OffersSectionTitle = ({ onClick }: { onClick: () => void }) => {
  return (
    <Stack>
      <Stack.Item fill>
        <Text as="h3" variant="headingSm">
          Offers
        </Text>
      </Stack.Item>
      <Stack.Item>
        <Button onClick={onClick}>View</Button>
      </Stack.Item>
    </Stack>
  );
};

const offer = {
  status: "open",
  _id: "63d32618c1ec5257ad7db4f6",
  offerAmt: 205,
  comments: "Second offer hello world david",
  providerId: "acct_1Lur4rIWxYvLVjGY",
  task: "63d26e6651167241c5f238a4",
  createdAt: "2023-01-27T01:17:12.653Z",
  updatedAt: "2023-01-27T01:17:12.653Z",
  __v: 0,
  timeElapsed: "12 days ago",
  id: "63d32618c1ec5257ad7db4f6",
};

type Offer = typeof offer;

export const OfferItemRow = ({
  offer,
  position,
}: {
  offer: unknown;
  position: number;
}) => {
  const { id, offerAmt, status, comments, providerId } = offer as any;

  return (
    <IndexTable.Row id={id} position={position}>
      <IndexTable.Cell>
        <div style={{ padding: "12px 16px" }}>
          <Stack>
            <Stack.Item fill>
              <Text variant="bodyMd" fontWeight="bold" as="span">
                ${offerAmt}
              </Text>
            </Stack.Item>
            <Stack.Item>{status}</Stack.Item>
          </Stack>
          <TextContainer>
            <Text variant="bodyMd" color="subdued" as="p">
              {providerId}
            </Text>
            <p>{comments}</p>
          </TextContainer>
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  );
};

export const OffersTable = ({ offers }: { offers: unknown[] }) => {
  return (
    <div aria-label="Offers Table">
      <Card>
        <IndexTable headings={[{ title: "Offer" }]} itemCount={2}>
          {offers.map((item, idx) => {
            return <OfferItemRow key={idx} offer={item} position={0} />;
          })}
        </IndexTable>
      </Card>
    </div>
  );
};

export const OffersSection = () => {
  const [showOffers, setShowOffers] = useState(false);
  const offers: unknown[] = [offer, { ...offer, id: "2" }];

  return (
    <Card.Section
      title={<OffersSectionTitle onClick={() => setShowOffers(!showOffers)} />}
    >
      {showOffers ? <OffersTable offers={offers} /> : null}
    </Card.Section>
  );
};

export const TaskCard = () => {
  return (
    <article aria-label="Task Card">
      <Card sectioned>
        <Card.Header title={"Title"}></Card.Header>
        <Card.Section title="Details"></Card.Section>
        <OffersSection />
      </Card>
    </article>
  );
};

export const TasksPage = () => {
  return (
    <div aria-label="Customer Tasks Page">
      <TaskCard />
    </div>
  );
};
