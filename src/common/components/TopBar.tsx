import { TopBar as TopBarPrimitive, Text } from "@shopify/polaris";
import { useSession } from "next-auth/react";
import { useState, useCallback, useEffect } from "react";
import { Session } from "next-auth";

import { routerPush } from "@Utils/index";
import { useSetAuthHeader } from "@Users/common/hooks";
import { UserType } from "@Users/common/types";
import { getUserType } from "@Users/common/utils";
import { signOut } from "@Users/common/api";

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

function getMenuItems(session?: Session) {
  if (session?.user.customerId) {
    return [
      { content: "Listings", onAction: () => routerPush("/") },
      { content: "Tasks", onAction: () => routerPush("/tasks") },
    ];
  }

  if (session?.user.providerId) {
    return [
      { content: "Listings", onAction: () => routerPush("/") },
      { content: "Offers", onAction: () => routerPush("/offers") },
    ];
  }

  return [{ content: "Listings", onAction: () => routerPush("/") }];
}

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
          items: getMenuItems(session),
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
