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
import styled from "styled-components";

import { ComponentProps, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Task } from "@Tasks/common/types";

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
          <TextContainer>
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

const resourceName = {
  singular: "customer",
  plural: "customers",
};

export const OffersTable = ({ offers }: { offers: Array<any> }) => {
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

  return (
    <div aria-label="Offers Table">
      <Card>
        <IndexTable
          headings={[{ title: "Offer" }]}
          itemCount={offers.length}
          selectedItemsCount={selectedResources.length}
          onSelectionChange={customHandleSelectionChange}
          promotedBulkActions={promotedBulkActions}
        >
          {offers.map((item, idx) => {
            return (
              <OfferItemRow
                key={item.id}
                offer={item}
                position={idx}
                selected={selectedResources.includes(item.id)}
              />
            );
          })}
        </IndexTable>
      </Card>
    </div>
  );
};

export const OffersSection = ({ task }: { task: Task }) => {
  const { id: taskId } = task;

  const [showOffers, setShowOffers] = useState(false);
  const [offers, setOffers] = useState(new Array<any>());
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
          <TextContainer>
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
  );
};

const StyledDiv = styled.div`
  .Polaris-IndexTable__ColumnHeaderCheckboxWrapper {
    display: none;
  }
`;

export const TasksPage = () => {
  const [currentPage, setCurrentPage]: any = useState(1);
  const { status } = useSession();
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

  // dedupes requests while loading
  useEffect(() => {
    if (status === "loading") return;

    getTasks(currentPage);
  }, [currentPage, status]);

  return (
    <StyledDiv aria-label="Customer Tasks Page">
      {tasks.map((item) => {
        return <TaskCard task={item} key={item.id} />;
      })}
    </StyledDiv>
  );
};
