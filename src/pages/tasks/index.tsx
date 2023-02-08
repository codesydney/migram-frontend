import { FeatureFlag } from "@Components/utils/FeatureFlag";
import { TasksPage } from "@Tasks/ViewTasks";

export default FeatureFlag(TasksPage, {
  isPage: true
});
