import { TopBar as TopBarPrimitive, Icon, Frame, Text } from "@shopify/polaris";
import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";

import { routerPush } from "@Utils/index";
import { getUserType, signOut } from "@Users/Auth/api";
import { useSetAuthHeader } from "@Users/Auth/hooks";
import { UserType } from "@Users/Auth/types";

/**
 * Shows when the User is not signed in.
 */
const defaultUserMenu = (
  <TopBarPrimitive.UserMenu
    actions={[]}
    name="Login"
    initials={undefined}
    open={false}
    onToggle={() => routerPush("/login")}
  />
);

/**
 * Top Navigation Bar
 */
export const TopBar = () => {
  const { data: session } = useSession();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  // TODO Refactor into App
  useSetAuthHeader(session);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
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

  const secondaryMenuMarkup = (
    <TopBarPrimitive.Menu
      activatorContent={
        <span>
          <Text variant="bodySm" as="span" visuallyHidden>
            Secondary menu
          </Text>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [{ content: "Community forums" }],
        },
      ]}
    />
  );

  return (
    <TopBarPrimitive
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      onNavigationToggle={handleNavigationToggle}
    />
  );
};
