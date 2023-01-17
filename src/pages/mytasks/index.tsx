import type { NextPage } from "next";
import TasksDashboard from "@Tasks/TasksDashboard";

const MyTasksPage: NextPage = () => {
  return <TasksDashboard myTasks={true} />;
};

export default MyTasksPage;
