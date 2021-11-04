import type { NextPage } from "next";
import Dashboard from "../../components/tasks/Dashboard";

const TasksPage: NextPage = () => {
  return <Dashboard myTasks={false} />;
};

export default TasksPage;
