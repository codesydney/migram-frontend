export const defaultMenu = [
  { text: "Login", href: "/login" },
  { text: "Become a Customer", href: "/signup", isButton: true },
];

export const customerMenu = [
  { text: "View Tasks", href: "/tasks" },
  { text: "My Tasks", href: "/mytasks" },
  { text: "Post a Task", href: "/tasks/createtask", isButton: true },
];

export const providerMenu = [
  { text: "View Tasks", href: "/tasks" },
  { text: "My Offers", href: "/offers" },
];

export const determineNavItems = (session: any) => {
  if (session?.user.providerId) return providerMenu;
  if (session?.user.customerId) return customerMenu;

  return defaultMenu;
};
