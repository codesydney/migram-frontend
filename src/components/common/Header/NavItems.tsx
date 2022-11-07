import Link from "next/link";

interface MenuProps {
  onClick: () => void;
}

export const ProviderMenu = ({ onClick }: MenuProps) => (
  <>
    <Link href="/tasks" onClick={onClick}>
      View Tasks
    </Link>
    <Link href="/offers" onClick={onClick}>
      My Offers
    </Link>
  </>
);

export const CustomerMenu = ({ onClick }: MenuProps) => (
  <>
    <Link href="/tasks" onClick={onClick}>
      View Tasks
    </Link>
    <Link href="/mytasks" onClick={onClick}>
      My Tasks
    </Link>
    <Link href="/tasks/createtask" onClick={onClick}>
      <button>Post a Task</button>
    </Link>
  </>
);

export const DefaultMenu = ({ onClick }: MenuProps) => (
  <>
    <Link href="/login" onClick={onClick}>
      <button>Login</button>
    </Link>
    <Link href="/signup" onClick={onClick}>
      <button>Signup</button>
    </Link>
  </>
);

export const NavItems = ({
  session,
  onClick,
}: {
  session: any;
  onClick: () => void;
}) => {
  if (session?.user.providerId) return <ProviderMenu onClick={onClick} />;
  if (session?.user.customerId) return <CustomerMenu onClick={onClick} />;

  return <DefaultMenu onClick={onClick} />;
};
