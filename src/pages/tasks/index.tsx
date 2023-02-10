import { TasksPage as TaskPagePrimitive } from "@Tasks/ViewTasks";
import { useSession } from "next-auth/react";

export default function TasksPage() {
  const { status } = useSession();

  return <TaskPagePrimitive status={status} />;
};
