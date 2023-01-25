export const CategoryStatusMap = {
  open: "success",
  assigned: "info",
  completed: "attention",
  paid: "info",
  pay_decline: "critical",
} as const;

export type TaskStatus = keyof typeof CategoryStatusMap;
