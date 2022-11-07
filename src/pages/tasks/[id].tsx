import type { NextPage } from "next";
import { useRouter } from "next/router";
import TasksDashboard from "../../features/Tasks/TasksDashboard";

const TasksPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <TasksDashboard id={id} />;
};

export default TasksPage;
