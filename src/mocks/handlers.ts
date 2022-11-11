import { rest } from "msw";
import { getTask } from "./handlers/tasks.handler";

export const handlers = [getTask];
