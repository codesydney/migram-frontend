import {
  Button,
  Card,
  IndexTable,
  IndexTableSelectionType,
  Layout,
  Page,
  Stack,
  Text,
  TextContainer,
  useIndexResourceState,
} from "@shopify/polaris";
import styled from "styled-components";

import { ComponentProps, useEffect, useState } from "react";
import axios from "axios";
import { Offer, Task } from "@Tasks/common/types";

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
            <Stack.Item>{status}</Stack.Item>
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

const acceptOfferMutation = (taskId: string, offerId: string) => {
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}api/v1/acceptoffer/`, {
      taskId,
      offerId,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
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
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${taskId}`, {})
      .then((response) => {
        if (taskId == response.data.data.task._id) {
          setUpdatedTask(response.data.data.task);
        }
      })
      .catch((error) => {
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

export const TaskCard = ({ task }: { task: Task }) => {
  const { location } = task;

  return (
    <Layout.Section>
      <article aria-label="Task Card">
        <Card sectioned>
          <Card.Header title={task.title}></Card.Header>
          <Card.Section
            title={
              <Text as="h3" variant="headingMd">
                Details
              </Text>
            }
          >
            <TextContainer spacing="tight">
              <Text as="h3" variant="headingSm">
                ${task.budget}
              </Text>
              <Text as="p" variant="bodyMd">
                {task.category}
              </Text>
              <Text as="p" variant="bodyMd">
                {task.details}
              </Text>
              <Text as="p" variant="bodyMd">
                {location.line1} {location.line2}, {location.city}{" "}
                {location.state} {location.postal_code}
              </Text>
            </TextContainer>
          </Card.Section>
          <OffersSection task={task} />
        </Card>
      </article>
    </Layout.Section>
  );
};

/**
 * Hides the heading checkbox in the IndexTable
 */
const StyledDiv = styled.div`
  .Polaris-IndexTable__ColumnHeaderCheckboxWrapper {
    display: none;
  }
`;

export const TasksPage = ({
  status,
}: {
  status: "authenticated" | "loading" | "unauthenticated";
}) => {
  const [currentPage, setCurrentPage]: any = useState(1);
  const [tasks, setTasks] = useState(Array<Task>);

  function getTasks(currentPage: number) {
    const params = { my_tasks: true };

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
        params,
      })
      .then((response) => {
        if (response.data.data.tasks.length == 0) {
          setCurrentPage(currentPage - 1);
        } else {
          setTasks(response.data.data.tasks);
        }
      })
      .catch((error) => {
        if (error.response.data.message == "This page does not exist.") {
          setCurrentPage(currentPage - 1);
        }
      });
  }

  useEffect(() => {
    if (status === "loading") return;

    getTasks(currentPage);
  }, [currentPage, status]);

  return (
    <StyledDiv aria-label="Customer Tasks Page">
      <Page title="Tasks" fullWidth>
        <Layout>
          {tasks.map((item) => {
            return <TaskCard task={item} key={item.id} />;
          })}
        </Layout>
      </Page>
    </StyledDiv>
  );
};
