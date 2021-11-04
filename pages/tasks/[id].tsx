import type { NextPage } from "next";
import { useRouter } from "next/router";
import Dashboard from "../../components/tasks/Dashboard";

const TasksPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);
  return <Dashboard id={id} />;
};

export default TasksPage;
