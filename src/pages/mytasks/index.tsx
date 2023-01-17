import type { NextPage } from "next";
import TasksDashboard from "@Tasks/features/Tasks/TasksDashboard";

const MyTasksPage: NextPage = () => {
  return <TasksDashboard myTasks={true} />;
};

export default MyTasksPage;
