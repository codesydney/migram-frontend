import type { NextPage } from "next";
import TasksDashboard from "../../components/tasks/TasksDashboard";

const MyTasksPage: NextPage = () => {
  return <TasksDashboard myTasks={true} />;
};

export default MyTasksPage;
