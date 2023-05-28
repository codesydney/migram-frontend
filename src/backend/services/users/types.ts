export type ServiceProviderMetadata = {
  role: "service-provider";
  serviceProviderId: string;
  customerId: undefined;
  onboardingStatus: "pending" | "onboarded";
};

export type CustomerMetadata = {
  role: "customer";
  customerId: string;
  serviceProviderId: undefined;
};

export type UserMetadata = ServiceProviderMetadata | CustomerMetadata;
