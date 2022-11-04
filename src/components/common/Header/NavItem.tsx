import Link from "next/link";

interface NavItemProps {
  href: string;
  text: string;
  isButton?: boolean;
  handleClick: () => void;
}

export const NavItem = ({
  href,
  text,
  handleClick,
  isButton = false,
}: NavItemProps) => {
  return (
    <li className="menu-item" onClick={handleClick}>
      <Link href={href} passHref={true} legacyBehavior>
        {isButton ? (
          <a>
            <button>{text}</button>
          </a>
        ) : (
          <a>{text}</a>
        )}
      </Link>
    </li>
  );
};
