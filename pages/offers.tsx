import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Dashboard from "../components/offers/Dashboard";
import { useSession } from "../node_modules/next-auth/client";

const OffersPage: NextPage = () => {
  return <Dashboard />;
};

export default OffersPage;
