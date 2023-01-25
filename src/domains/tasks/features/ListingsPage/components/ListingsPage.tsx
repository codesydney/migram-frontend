import { useEffect, useState } from "react";

import axios from "axios";
import { useSession } from "next-auth/react";

import { Layout, Page } from "@shopify/polaris";
import { MakeAnOfferModal } from "@Tasks/Offers/features/MakeAnOfferForm";
import { ListingCard } from "./ListingCard";

export function ListingsPage({ myTasks }: any) {
  const [currentPage, setCurrentPage]: any = useState(1);
  const { status } = useSession();
  const [tasks, setTasks]: any[] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();

  function getTasks(currentPage: number, myTasks: boolean) {
    const params = myTasks
      ? { my_tasks: true }
      : { page: currentPage, limit: 6 };

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

    getTasks(currentPage, myTasks);
  }, [currentPage, status, myTasks]);

  return (
    <Page title="Listings" fullWidth>
      <Layout>
        {tasks.map((task: any) => (
          <Layout.Section oneHalf key={task.id}>
            <ListingCard
              task={task}
              onMakeAnOfferClick={() => setSelectedTaskId(task.id)}
            />
          </Layout.Section>
        ))}
      </Layout>
      {selectedTaskId ? (
        <MakeAnOfferModal
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(undefined)}
        />
      ) : null}
    </Page>
  );
}
