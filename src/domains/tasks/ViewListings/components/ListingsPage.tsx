import { useEffect, useState } from "react";
import Link from "next/link";

import axios from "axios";
import { useSession } from "next-auth/react";
import { Button, Layout } from "@shopify/polaris";

import { MakeAnOfferModal } from "@Tasks/MakeOffer";
import { ListingCard } from "./ListingCard";
import { PageWithNotifications } from "src/common/features/notifications";

import { routerPush } from "@Utils/router";

export function ListingsPage() {
  const [currentPage, setCurrentPage]: any = useState(1);
  const { status, data } = useSession();
  const [tasks, setTasks]: any[] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();

  const isProvider = data?.user.providerId ? true : false;

  function getTasks(currentPage: number) {
    const params = { page: currentPage, limit: 6 };

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
    <PageWithNotifications
      title="Listings"
      fullWidth
      primaryAction={
        <Button primary onClick={() => routerPush("/tasks/new")}>
          Create Task
        </Button>
      }
    >
      {data ? null : (
        <div
          style={{
            marginTop: "1.25em",
            fontSize: "1.3em"
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
