import type { NextPage } from "next";
import Dashboard from "../../components/tasks/Dashboard";

const MyTasksPage: NextPage = () => {
  return <Dashboard myTasks={true} />;
};

export default MyTasksPage;
