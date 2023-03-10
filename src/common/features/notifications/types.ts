export type Notification = {
  id: string;
  isError: boolean;
  title: string;
  status: number;
  statusText: string;
  level: "info" | "warn" | "error";
};
