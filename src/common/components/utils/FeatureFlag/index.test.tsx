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

  it("should render nothing when node_env = 'production'", () => {
    process.env = { ...env, NODE_ENV: "production" };

    const ProductionComponent = () => <div>Production Component</div>;
    const ActualComponent = FeatureFlag(ProductionComponent);

    render(<ActualComponent />);

    expect(screen.queryByText(/production component/i)).toBeNull();
  });

  it("should render 'this feature is not available' when node_env = 'production' and component is page", () => {
    process.env = { ...env, NODE_ENV: "production" };

    const ProductionComponent = () => <div>Production Component</div>;
    const ActualComponent = FeatureFlag(ProductionComponent, {
      isPage: true,
    });

    render(<ActualComponent />);

    expect(screen.queryByText(/this feature is not available./i)).toBeTruthy();
  });

  it("should return the component when node_env = 'development'", () => {
    process.env = { ...env, NODE_ENV: "development" };

    const DevlopmentComponent = () => <div>Development Component</div>;
    const ActualComponent = FeatureFlag(DevlopmentComponent);

    render(<ActualComponent />);

    expect(screen.queryByText(/development component/i)).not.toBeNull();
  });

  it("should return the component when node_env = 'test", () => {
    process.env = { ...env, NODE_ENV: "test" };

    const TestComponent = () => <div>Test Component</div>;
    const ActualComponent = FeatureFlag(TestComponent);

    render(<ActualComponent />);

    expect(screen.queryByText(/test component/i)).not.toBeNull();
  });
});
