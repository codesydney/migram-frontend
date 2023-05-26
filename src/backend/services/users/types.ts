export type ServiceProviderMetadata = {
  role: "service-provider";
  serviceProviderId: string;
  onboardingStatus: "pending" | "onboarded";
};

export type CustomerMetadata = {
  role: "customer";
  customerId: string;
};

export type UserMetadata = ServiceProviderMetadata | CustomerMetadata;
