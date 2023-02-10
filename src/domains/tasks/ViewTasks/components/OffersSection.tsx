import { ComponentProps, useState, useEffect } from "react";
import {
  Button,
  Card,
  IndexTable,
  IndexTableSelectionType,
  Stack,
  Text,
  TextContainer,
  useIndexResourceState,
} from "@shopify/polaris";

import { Offer, Task, TaskStatus } from "@Tasks/common/types";

import { acceptOfferMutation, getOffersOfTaskQuery } from "../api";
import { OfferStatusBadge, TaskCategoryBadge } from "@Tasks/common/components";

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

type IndexTableRowProps = ComponentProps<typeof IndexTable.Row>;

type OfferItemRowProps = {
  offer: any;
} & Omit<IndexTableRowProps, "id" | "children">;

export const OfferItemRow = ({ offer, ...props }: OfferItemRowProps) => {
  const { id, offerAmt, status, comments, firstName } = offer as any;

  return (
    <IndexTable.Row {...props} id={id}>
      <IndexTable.Cell>
        <div style={{ padding: "12px 16px" }}>
          <Stack>
            <Stack.Item fill>
              <Text variant="bodyMd" fontWeight="bold" as="span">
                ${offerAmt}
              </Text>
            </Stack.Item>
            <Stack.Item>
              <OfferStatusBadge status={status as TaskStatus} />
            </Stack.Item>
          </Stack>
          <TextContainer spacing="tight">
            <Text variant="bodyMd" color="subdued" as="p">
              {firstName}
            </Text>
            <p>{comments}</p>
          </TextContainer>
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  );
};

export const OffersTable = ({ offers }: { offers: Array<Offer> }) => {
  const { handleSelectionChange, selectedResources, clearSelection } =
    useIndexResourceState(offers);

  const customHandleSelectionChange = (
    selectionType: IndexTableSelectionType,
    isSelecting: boolean,
    selection?: string | [number, number] | undefined
  ) => {
    const isPageSelect = selectionType === IndexTableSelectionType.Page;
    clearSelection();

    // disable multi-select
    if (isPageSelect) {
      handleSelectionChange(selectionType, false, selection);
      return;
    }

    handleSelectionChange(
      IndexTableSelectionType.Single,
      isSelecting,
      selection
    );
  };

  const promotedBulkActions = [
    {
      content: "View Contact Details",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Accept Offer",
      onAction: () => {
        const offer = offers.find((item) => {
          return item.id === selectedResources[0];
        });

        const body = {
          taskId: offer?.task as string,
          offerId: selectedResources[0],
        };

        acceptOfferMutation(body.taskId, body.offerId);
      },
    },
  ];

  return (
    <div aria-label="Offers Table">
      <Card>
        <IndexTable
          headings={[{ title: "Offer" }]}
          itemCount={offers?.length ?? 0}
          selectedItemsCount={selectedResources.length}
          onSelectionChange={customHandleSelectionChange}
          promotedBulkActions={promotedBulkActions}
        >
          {offers?.length > 0
            ? offers.map((item, idx) => {
                return (
                  <OfferItemRow
                    key={item.id}
                    offer={item}
                    position={idx}
                    selected={selectedResources.includes(item.id)}
                  />
                );
              })
            : null}
        </IndexTable>
      </Card>
    </div>
  );
};

export const OffersSection = ({ task }: { task: Task }) => {
  const { id: taskId } = task;

  const [showOffers, setShowOffers] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<any>(task);

  useEffect(() => {
    getOffersOfTaskQuery(task.id)
      .then((response: any) => {
        if (taskId == response.data.data.task._id) {
          setUpdatedTask(response.data.data.task);
        }
      })
      .catch((error: any) => {
        setUpdatedTask(task);
      });
  }, [task, taskId]);

  return (
    <Card.Section
      title={<OffersSectionTitle onClick={() => setShowOffers(!showOffers)} />}
    >
      {showOffers ? <OffersTable offers={updatedTask.offers} /> : null}
    </Card.Section>
  );
};
