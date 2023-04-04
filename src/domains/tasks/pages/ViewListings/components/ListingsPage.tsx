import { useState } from "react";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { Button, Layout } from "@shopify/polaris";

import { MakeAnOfferModal } from "@Tasks/MakeOffer";
import { ListingCard } from "./ListingCard";
import { PageWithNotifications } from "src/common/features/notifications";

import { routerPush } from "@Utils/router";
import { Task } from "@Tasks/common";

export type ListingsPageProps = {
  initialTasks: Task[];
  status: "authenticated" | "loading" | "unauthenticated";
};

export function ListingsPage({ initialTasks, status }: ListingsPageProps) {
  const { data } = useSession();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();

  const isProvider = data?.user.providerId ? true : false;
  const isCustomer = data?.user.customerId ? true : false;

  const createTaskButton = (
    <Button primary onClick={() => routerPush("/tasks/new")}>
      Create Task
    </Button>
  );

  return (
    <PageWithNotifications
      title="Listings"
      fullWidth
      primaryAction={isCustomer && createTaskButton}
    >
      {status !== "authenticated" && (
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

      {selectedTaskId && (
        <MakeAnOfferModal
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(undefined)}
        />
      )}
    </PageWithNotifications>
  );
}
