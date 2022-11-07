import type { NextPage } from "next";
import TasksDashboard from "../../features/Tasks/TasksDashboard";

const TasksPage: NextPage = () => {
  return <TasksDashboard myTasks={false} />;
};

export default TasksPage;
