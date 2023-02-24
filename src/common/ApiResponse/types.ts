export type ApiEvent = {
  isError: boolean;
  title: string;
  status: number;
  statusText: string;
};

export type ApiResponse<TData> = {
  apiEvent: ApiEvent;
  data?: TData;
};
