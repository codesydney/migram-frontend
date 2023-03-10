export type Notification = {
  id: string;
  isError: boolean;
  title: string;
  type: "notification" | "toast";
  status: "success" | "info" | "warning" | "critical";
  source: string;
};
