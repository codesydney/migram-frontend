import { getOffers } from "./handlers/offers.handler";
import { getTask } from "./handlers/tasks.handler";

export const handlers = [getTask, getOffers];
