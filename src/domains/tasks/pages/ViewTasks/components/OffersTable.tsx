"use client";

import { ComponentProps } from "react";
import {
  Card,
  IndexTable,
  IndexTableSelectionType,
  Stack,
  Text,
  TextContainer,
  useIndexResourceState,
} from "@shopify/polaris";

import {
  createNotification,
  useNotifications,
} from "src/common/features/notifications";

import { Offer, OfferStatus, OfferStatusBadge } from "@Tasks/common";
import { acceptOfferMutation } from "../api";

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
              <OfferStatusBadge status={status as OfferStatus} />
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
  const { dispatchNotifications } = useNotifications();

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

        acceptOfferMutation(body.taskId, body.offerId)
          .then((response) => {
            const action = {
              type: "set",
              event: createNotification({
                status: "success",
                isError: false,
                title: `Successfully accepted offer.`,
                type: "toast",
                source: "Accept Offer Success",
              }),
            } as const;

            dispatchNotifications(action);
          })
          .catch((error) => {
            const action = {
              type: "set",
              event: createNotification({
                status: "critical",
                isError: true,
                title: "Failed to select offer, please try again later.",
                type: "toast",
                source: "Accept Offer Failure",
              }),
            } as const;

            dispatchNotifications(action);
          });
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
