import axios from "axios";
import type { NextPage } from "next";
import Landing from "../components/account/Landing";

const Home: NextPage = () => {
  //const router = useRouter;
  //const { success } = router.query;

  axios.get("/api/auth/session?update", { withCredentials: true }).then(() => {
    console.log("updated credentials!");
  });

  return <Landing />;
};

export default Home;
