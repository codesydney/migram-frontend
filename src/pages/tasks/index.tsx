import { FeatureFlag } from "@Components/utils/FeatureFlag";
import { TasksPage as TaskPagePrimitive } from "@Tasks/ViewTasks";
import { useSession } from "next-auth/react";

const TasksPage = () => {
  const { status } = useSession();

  return <TaskPagePrimitive status={status} />;
};

export default FeatureFlag(TasksPage, {
  isPage: true,
});
