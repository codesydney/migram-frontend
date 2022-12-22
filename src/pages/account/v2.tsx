import { FeatureFlag } from "../../utils/FeatureFlag";

const AccountPageV2 = () => {
  return <div aria-label="Account Page"></div>;
};

export default FeatureFlag(AccountPageV2, { isPage: true });
