import {
  Card,
  Stack,
  Text,
  Badge,
  Button,
  Collapsible,
  IndexTable,
  useIndexResourceState,
  TextContainer,
} from "@shopify/polaris";

import { useState } from "react";

const promotedBulkActions = [
  {
    content: "View Contact Details",
    onAction: () => console.log("Todo: implement bulk add tags"),
  },
  {
    content: "Accept Offer",
    onAction: () => console.log("Todo: implement bulk add tags"),
  },
];

function SimpleIndexTableExample() {
  const [selectedResources, setSelectedResources] = useState(
    new Array<string>()
  );

  const customers = [
    {
      id: "3411",
      url: "customers/341",
      name: "Mae Jemison",
      location: "Darlinghurst NSW",
      status: <Badge status="success">Accepted</Badge>,
      amount: "$150",
      description:
        "Hi, I can do this on Monday for $150. Hello world. Make a long description",
    },
    {
      id: "2561",
      url: "customers/256",
      name: "Ellen Ochoa",
      location: "Sydney NSW",
      status: <Badge status="critical">Declined</Badge>,
      amount: "$140",
      description: "Hi, I can do this for $140",
    },
  ];
  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const { allResourcesSelected, handleSelectionChange } = useIndexResourceState(
    customers,
    { selectedResources }
  );

  const rowMarkup = customers.map(
    ({ id, name, location, status, amount, description }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        onClick={() => {
          if (selectedResources.includes(id)) {
            setSelectedResources([]);
          } else {
            setSelectedResources([id]);
          }
        }}
        position={index}
      >
        <div style={{ padding: "12px 16px" }}>
          <Stack>
            <Stack.Item fill>
              <Text variant="bodyMd" fontWeight="bold" as="span">
                {amount}
              </Text>
            </Stack.Item>
            <Stack.Item>{status}</Stack.Item>
          </Stack>
          <Text variant="bodyMd" color="subdued" as="p">
            {name} - {location}
          </Text>
          <p>{description}</p>
        </div>
      </IndexTable.Row>
    )
  );

  return (
    <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[{ title: "Offer" }]}
        promotedBulkActions={promotedBulkActions}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export const TaskCard = ({ task, onMakeAnOfferClick }: any) => {
  const [showOffers, setShowOffers] = useState(false);

  return (
    <Card title={task.title} sectioned>
      <Card.Section>
        <TextContainer>
          <Text variant="headingMd" as="h3">
            ${task.budget}
          </Text>
          <p>{task.details}</p>

          <p>{`${task.location.line1} ${task.location.line2 ?? ""} ${
            task.location.city
          }  ${task.location.state}  ${task.location.postal_code}`}</p>
        </TextContainer>
      </Card.Section>
      <Card.Section
        title={
          <Stack>
            <Stack.Item fill>
              <Text variant="headingMd" as="h6">
                Offers
              </Text>
            </Stack.Item>
            <Stack.Item>
              <Button size="slim" onClick={() => setShowOffers(!showOffers)}>
                View
              </Button>
            </Stack.Item>
          </Stack>
        }
      >
        <Collapsible open={showOffers} id={""}>
          <SimpleIndexTableExample />
        </Collapsible>
      </Card.Section>
    </Card>
  );
};
