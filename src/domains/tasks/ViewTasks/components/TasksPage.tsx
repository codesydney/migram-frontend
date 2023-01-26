import { MakeAnOfferModal } from "@Tasks/MakeOffer";
import { ListingCard } from "@Tasks/ViewListings/components";
import { Page, Button, Layout } from "@shopify/polaris";
import axios from "axios";
import { useState, useEffect } from "react";

/**
 * Customer Admin view for the Tasks that they own.
 */
export const TasksPage = () => {
  const [currentPage, setCurrentPage]: any = useState(1);
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
    getTasks(currentPage, false);
  }, [currentPage]);

  return (
    <div aria-label="View Tasks Page">
      <Page
        title="Tasks"
        fullWidth
        primaryAction={<Button primary>Create Task</Button>}
      >
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
    </div>
  );
};
