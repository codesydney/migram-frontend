import type { NextPage } from "next";
import TasksDashboard from "../../features/Tasks/TasksDashboard";

const MyTasksPage: NextPage = () => {
  return <TasksDashboard myTasks={true} />;
};

export default MyTasksPage;
