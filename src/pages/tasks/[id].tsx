import type { NextPage } from "next";
import { useRouter } from "next/router";

const TasksPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <></>;
  // return <TasksDashboard id={id} />;
};

export default TasksPage;
