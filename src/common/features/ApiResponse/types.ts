export type ApiEvent = {
  id: string;
  isError: boolean;
  title: string;
  status: number;
  statusText: string;
  level: "info" | "warn" | "error";
};

export type ApiResponse<TData> = {
  apiEvent: ApiEvent;
  data?: TData;
};
