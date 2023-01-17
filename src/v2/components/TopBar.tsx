import { TopBar as TopBarPrimitive, Icon, Frame, Text } from "@shopify/polaris";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useCallback, useEffect } from "react";

const signOut = () => alert("Signing Out, Dave");
const navigate = (url: string) => alert(url);

export const TopBar = () => {
  const { data: session } = useSession();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  // TODO Refactor into App
  useEffect(() => {
    if (session && !axios.defaults.headers.common["authorization"]) {
      axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${session?.accessToken}`;
    }
  }, [session]);

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

  const userMenuMarkup = (
    <TopBarPrimitive.UserMenu
      actions={[
        {
          items: [{ content: "Account", onAction: () => navigate("/account") }],
        },
        {
          items: [{ content: "Sign Out", onAction: signOut }],
        },
      ]}
      name={session?.user?.firstName as string}
      initials="D"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
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
