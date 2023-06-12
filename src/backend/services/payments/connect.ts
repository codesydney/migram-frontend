import Stripe from "stripe";

import { stripe } from "@/backend/services/payments";

export type CreateStripeConnectAccountParams = {
  userId: string;
  email: string;
  companyType?: "sole_proprietorship";
};

export async function createStripeConnectAccount(
  params: CreateStripeConnectAccountParams
) {
  const accountParams: Stripe.AccountCreateParams = {
    type: "express",
    business_type: "company",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    company: {
      structure: params?.companyType ?? "sole_proprietorship",
    },
    email: params.email,

    metadata: { userId: params.userId },
  };

  return await stripe.accounts.create(accountParams);
}

export async function createStripeConnectRedirectLink(accountId: string) {
  if (!process.env.STRIPE_RETURN_URL || !process.env.STRIPE_REFRESH_URL)
    throw new Error("STRIPE_RETURN_URL or STRIPE_REFRESH_URL not set");

  return await stripe.accountLinks.create({
    account: accountId,
    return_url: process.env.STRIPE_RETURN_URL,
    refresh_url: process.env.STRIPE_REFRESH_URL,
    type: "account_onboarding",
    collect: "eventually_due",
  });
}
