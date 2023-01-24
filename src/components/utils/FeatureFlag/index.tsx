import Link from "next/link";
import { Fragment, ComponentType } from "react";

/**
 * Fallback for FeatureFlagged pages.
 * @returns feature not available heading and link to the homepage.
 */
const PageNotAvailableFallback = () => (
  <div className="container">
    <h1 className="text-4xl font-medium">This feature is not available.</h1>
    <Link href="/" className="text-xl mt-4 text-blue-600 underline">
      Take me Home.
    </Link>
  </div>
);

/**
 * Hides a component in production environments.
 * Primarily used to hide features that are currently under development.
 * @param component React Component
 * @param options
 * @returns component, or React.Fragment, or PageNotAvailableFallback
 */
export const FeatureFlag = <T,>(
  component: ComponentType<T>,
  options: {
    isPage: boolean;
  } = { isPage: false }
) => {
  if (process.env.NODE_ENV !== "production") return component;

  if (options.isPage) return PageNotAvailableFallback;

  return Fragment;
};
