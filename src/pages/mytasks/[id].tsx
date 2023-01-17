import { useRouter } from "next/router";
import TasksDashboard from "@Tasks/TasksDashboard";

const TasksPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <TasksDashboard myTasks={true} id={id} />;
};

export default TasksPage;
