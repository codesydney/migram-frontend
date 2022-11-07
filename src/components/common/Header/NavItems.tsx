import { useSession } from "next-auth/react";
import Link from "next/link";
import ButtonStyles from "../../styles/ButtonStyles";

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
      <ButtonStyles primary>Post a Task</ButtonStyles>
    </Link>
  </>
);

export const DefaultMenu = ({ onClick }: MenuProps) => (
  <>
    <Link href="/login" onClick={onClick}>
      <ButtonStyles>Login</ButtonStyles>
    </Link>
    <Link href="/signup" onClick={onClick}>
      <ButtonStyles primary>Signup</ButtonStyles>
    </Link>
  </>
);

export const NavItems = ({ onClick }: MenuProps) => {
  const { data: session }: any = useSession();

  if (!session?.user) return <DefaultMenu onClick={onClick} />;

  if (session?.user.providerId) return <ProviderMenu onClick={onClick} />;
  if (session?.user.customerId) return <CustomerMenu onClick={onClick} />;

  return <DefaultMenu onClick={onClick} />;
};
