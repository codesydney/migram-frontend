import { TopBar as TopBarPrimitive, Icon, Frame, Text } from "@shopify/polaris";
import { useState, useCallback } from "react";

export const TopBar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

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

  const logo = {
    width: 124,
    topBarSource: "/logo.png",
    url: "/",
    accessibilityLabel: "Migram",
  };

  const userMenuMarkup = (
    <TopBarPrimitive.UserMenu
      actions={[
        {
          items: [{ content: "Account" }],
        },
        {
          items: [{ content: "Sign Out" }],
        },
      ]}
      name="Dharma"
      detail="Jaded Pixel"
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

  const topBarMarkup = (
    <TopBarPrimitive
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return (
    <div style={{ height: "250px" }}>
      <Frame topBar={topBarMarkup} logo={logo} />
    </div>
  );
};
