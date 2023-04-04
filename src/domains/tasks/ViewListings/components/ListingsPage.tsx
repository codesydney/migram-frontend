import { useEffect, useState } from "react";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { Button, Layout } from "@shopify/polaris";

import { MakeAnOfferModal } from "@Tasks/MakeOffer";
import { ListingCard } from "./ListingCard";
import {
  PageWithNotifications,
  useNotifications,
} from "src/common/features/notifications";

import { routerPush } from "@Utils/router";
import { createNotification } from "src/common/features/notifications/utils";
import { getTasksQuery } from "@Tasks/common/api";

export function ListingsPage() {
  const [currentPage, setCurrentPage]: any = useState(1);
  const { status, data } = useSession();
  const [tasks, setTasks]: any[] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();
  const { dispatchNotifications } = useNotifications();

  const isProvider = data?.user.providerId ? true : false;
  const isCustomer = data?.user.customerId ? true : false;

  const createTaskButton = (
    <Button primary onClick={() => routerPush("/tasks new")}>
      {" "}
      Create Task{" "}
    </Button>
  );

  useEffect(() => {
    if (status === "loading") return;

    dispatchNotifications({ type: "clear" });

    getTasksQuery(currentPage)
      .then((response) => {
        if (response.data.data.tasks.length == 0) {
          setCurrentPage(currentPage - 1);
        } else {
          setTasks(response.data.data.tasks);
        }
      })
      .catch((error) => {
        const action = {
          type: "set",
          event: createNotification({
            status: "critical",
            isError: true,
            title: `Failed to fetch tasks. Please refresh the page. If the problem persists, please contact the administrator at ${process.env.ADMIN_EMAIL}`,
            type: "notification",
            source: "",
          }),
        } as const;

        dispatchNotifications(action);
      });
  }, [currentPage, dispatchNotifications, status]);

  return (
    <PageWithNotifications
      title="Listings"
      fullWidth
      primaryAction={isCustomer ? createTaskButton : null}
    >
      {data ? null : (
        <div
          style={{
            marginTop: "1.25em",
            fontSize: "1.3em",
          }}
        >
          Please&nbsp;<Link href="/login">login</Link>&nbsp;or&nbsp;
          <Link href="/signup">signup</Link>&nbsp;to view listings.
        </div>
      )}

      {tasks.map((task: any) => (
        <Layout.Section oneHalf key={task.id}>
          <ListingCard
            isProvider={isProvider}
            task={task}
            onMakeAnOfferClick={() => setSelectedTaskId(task.id)}
          />
        </Layout.Section>
      ))}
      {selectedTaskId ? (
        <MakeAnOfferModal
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(undefined)}
        />
      ) : null}
    </PageWithNotifications>
  );
}
