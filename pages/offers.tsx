import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Offers from "../components/offers/Offers";
import { useSession } from "../node_modules/next-auth/client";

const OffersPage: NextPage = () => {
  return <Offers />;
};

export default OffersPage;
