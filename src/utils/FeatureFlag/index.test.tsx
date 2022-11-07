import { screen, render } from "@testing-library/react";
import { FeatureFlag } from ".";

describe("FeatureFlag", () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  describe("When node_env = 'production'", () => {
    test("it returns a React.Fragment", () => {
      process.env = { ...env, NODE_ENV: "production" };

      const ProductionComponent = () => <div>Production Component</div>;
      const ActualComponent = FeatureFlag(ProductionComponent);

      render(<ActualComponent />);

      expect(screen.queryByText(/production component/i)).toBeNull();
    });
  });

  describe("When node_env = 'production' and Component isPage = true", () => {
    test("it renders 'this feature is not available'", () => {
      process.env = { ...env, NODE_ENV: "production" };

      const ProductionComponent = () => <div>Production Component</div>;
      const ActualComponent = FeatureFlag(ProductionComponent, {
        isPage: true,
      });

      render(<ActualComponent />);

      expect(
        screen.queryByText(/this feature is not available./i)
      ).not.toBeNull();
    });
  });

  describe("When node_env = 'development'", () => {
    test("it returns the development component", () => {
      process.env = { ...env, NODE_ENV: "development" };

      const DevlopmentComponent = () => <div>Development Component</div>;
      const ActualComponent = FeatureFlag(DevlopmentComponent);

      render(<ActualComponent />);

      expect(screen.queryByText(/development component/i)).not.toBeNull();
    });
  });

  describe("When node_env = 'test'", () => {
    test("it returns a test component", () => {
      process.env = { ...env, NODE_ENV: "test" };

      const TestComponent = () => <div>Test Component</div>;
      const ActualComponent = FeatureFlag(TestComponent);

      render(<ActualComponent />);

      expect(screen.queryByText(/test component/i)).not.toBeNull();
    });
  });
});
