import { TopBar as TopBarPrimitive, Icon, Frame, Text } from "@shopify/polaris";
import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";

import { routerPush } from "@Utils/index";
import { useSetAuthHeader } from "@Users/Auth/hooks";
import { UserType } from "@Users/Auth/types";
import { signOut } from "@Users/Auth/api/AuthService";
import { getUserType } from "@Users/Auth/utils";

/**
 * Shows when the User is not signed in.
 */
const defaultUserMenu = (
  <TopBarPrimitive.UserMenu
    actions={[]}
    name="Sign Up"
    initials={undefined}
    open={false}
    onToggle={() => routerPush("/signup")}
  />
);

const secondaryMenuMarkup = (
  <TopBarPrimitive.Menu
    activatorContent={
      <span>
        <Text variant="bodyMd" fontWeight="medium" as="span">
          Login
        </Text>
      </span>
    }
    open={false}
    onOpen={() => routerPush("/login")}
    onClose={() => {}}
    actions={[]}
  />
);

/**
 * Top Navigation Bar
 */
export const TopBar = () => {
  const { data: session } = useSession();
  const showLoginButton = !session ? secondaryMenuMarkup : null;

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // TODO Refactor into App
  useSetAuthHeader(session);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  const userMenuMarkup = session ? (
    <TopBarPrimitive.UserMenu
      actions={[
        {
          items: [
            { content: "Account", onAction: () => routerPush("/account") },
          ],
        },
        {
          items: [{ content: "Sign Out", onAction: signOut }],
        },
      ]}
      name={session?.user?.firstName as string}
      initials="D"
      detail={UserType[getUserType(session?.user)]}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  ) : (
    defaultUserMenu
  );

  return (
    <TopBarPrimitive
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={showLoginButton}
      onNavigationToggle={handleNavigationToggle}
    />
  );
};
