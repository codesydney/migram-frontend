import type { NextPage } from "next";
import TasksDashboard from "../../components/tasks/TasksDashboard";

const TasksPage: NextPage = () => {
  return <TasksDashboard myTasks={false} />;
};

export default TasksPage;
