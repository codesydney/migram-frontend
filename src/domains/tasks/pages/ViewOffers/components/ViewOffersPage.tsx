import { useState } from "react";
import dynamic from "next/dynamic";
import { Layout } from "@shopify/polaris";
import { AxiosError } from "axios";
import styled from "styled-components";

import {
  PageWithNotifications,
  useNotifications,
} from "src/common/features/notifications";
import { createNotification } from "src/common/features/notifications/utils";

import { Offer, Task } from "@Tasks/common";

import { getTaskQuery } from "../api";
import { OfferCard } from "./OfferCard";

const TaskCard = dynamic(() =>
  import("./TaskCard").then((mod) => mod.TaskCard)
);

const StyledDiv = styled.div`
  .Polaris-Layout {
    .Polaris-Layout__Section {
      width: 100%;
    }

    @media (min-width: 1200px) {
      flex-direction: row;
    }
  }
`;

export type ViewOffersPageProps = {
  initialOffers: Offer[];
};

export function ViewOffersPage({ initialOffers }: ViewOffersPageProps) {
  const { dispatchNotifications } = useNotifications();

  const [offers, setOffers] = useState(initialOffers);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [loading, setLoading] = useState(false);

  const onViewTaskClick = async (taskId: string) => {
    setLoading(true);

    getTaskQuery(taskId)
      .then((task) => {
        setSelectedTask(task);
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          dispatchNotifications({
            type: "set",
            event: createNotification({
              isError: true,
              title: error.response.data.message,
              type: "notification",
              status: "warning",
              source: "Api Error",
            }),
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <StyledDiv aria-label="View Offers Page">
      <PageWithNotifications title="Offers" fullWidth>
        <Layout.Section oneHalf>
          <TaskCard task={selectedTask} loading={loading} />
        </Layout.Section>
        <Layout.Section oneHalf>
          {offers.map((offer) => {
            return (
              <OfferCard
                offer={offer}
                key={offer.id}
                onViewTaskClick={() => {
                  onViewTaskClick(offer.task);
                }}
              />
            );
          })}
        </Layout.Section>
      </PageWithNotifications>
    </StyledDiv>
  );
}
