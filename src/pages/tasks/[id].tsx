import type { NextPage } from "next";
import { useRouter } from "next/router";
import TasksDashboard from "../../components/tasks/TasksDashboard";

const TasksPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);
  return <TasksDashboard id={id} />;
};

export default TasksPage;
