/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Disclosure } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Offer } from "@/types/schemas/Offer";
import { Task } from "@/types/schemas/Task";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const subtotal = "$108.00";
const discount = { code: "CHEAPSKATE", amount: "$16.00" };
const taxes = "$9.92";
const shipping = "$8.00";
const total = "$141.92";
const products = [
  {
    id: 1,
    name: "Mountain Mist Artwork Tee",
    href: "#",
    price: "$36.00",
    color: "Birch",
    size: "L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-form-04-product-01.jpg",
    imageAlt:
      "Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.",
  },
  // More products...
];

export default function CheckoutForm() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const task = checkoutData?.task;
  const acceptedOffer = checkoutData?.acceptedOffer;

  const options = {
    appearance: {
      // Fully customizable with appearance API.
    },
    clientSecret: checkoutData?.clientSecret,
  };

  const taskId = router.query.taskId as string;

  useEffect(() => {
    if (taskId) {
      const url = `/api/payments/payment-intent`;

      axios
        .post(url, {
          taskId,
        })
        .then((res) => {
          setCheckoutData(res.data);
        })
        .catch((err) => alert(err));
    }
  }, [taskId]);

  return (
    <>
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
        <h1 className="sr-only">Checkout</h1>

        {acceptedOffer && task && (
          <>
            <MobileOrderSummary acceptedOffer={acceptedOffer} task={task} />
            <OrderSummary acceptedOffer={acceptedOffer} task={task} />
          </>
        )}

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
        >
          <h2 id="payment-heading" className="sr-only">
            Payment and shipping details
          </h2>

          {options.clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <StripeCheckoutForm />
            </Elements>
          )}
        </section>
      </main>
    </>
  );
}

export type OrderSummaryProps = {
  acceptedOffer: Offer;
  task: Task;
};

export function MobileOrderSummary({ acceptedOffer, task }: OrderSummaryProps) {
  return (
    <section
      aria-labelledby="order-heading"
      className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
    >
      <Disclosure as="div" className="mx-auto max-w-lg">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between">
              <h2
                id="order-heading"
                className="text-lg font-medium text-gray-900"
              >
                Your Order
              </h2>
              <Disclosure.Button className="font-medium text-indigo-600 hover:text-indigo-500">
                {open ? (
                  <span>Hide full summary</span>
                ) : (
                  <span>Show full summary</span>
                )}
              </Disclosure.Button>
            </div>

            <Disclosure.Panel>
              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-gray-200"
              >
                <li key={task._id} className="flex space-x-6 py-6">
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="space-y-1 text-sm font-medium">
                      <h3 className="text-gray-900">{task.shortDescription}</h3>
                      <p className="text-gray-900">{task.details}</p>
                    </div>
                  </div>
                </li>
              </ul>

              <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">${acceptedOffer.amount}.00</dd>
                </div>
                {/* <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-gray-900">{taxes}</dd>
                </div> */}
              </dl>
            </Disclosure.Panel>

            <p className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
              <span className="text-base">Total</span>
              <span className="text-base">${acceptedOffer.amount}.00</span>
            </p>
          </>
        )}
      </Disclosure>
    </section>
  );
}

export function OrderSummary({ acceptedOffer, task }: OrderSummaryProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex"
    >
      <h2 id="summary-heading" className="sr-only">
        Order summary
      </h2>

      <ul
        role="list"
        className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6"
      >
        {
          <li key={task._id} className="flex space-x-6 py-6">
            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-1 text-sm font-medium">
                <h3 className="text-gray-900">{task.shortDescription}</h3>
                <p className="text-gray-900">{task.details}</p>
              </div>
            </div>
          </li>
        }
      </ul>

      <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
        <dl className="space-y-6 text-sm font-medium text-gray-500">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="text-gray-900">${acceptedOffer.amount}.00</dd>
          </div>
          {/* <div className="flex justify-between">
            <dt>Taxes</dt>
            <dd className="text-gray-900">{taxes}</dd>
          </div> */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
            <dt>Total</dt>
            <dd className="text-base">${acceptedOffer.amount}.00</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function StripeCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <div
      id="payment-form"
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg lg:pt-16"
    >
      <form className="mt-6">
        <LinkAuthenticationElement
          id="link-authentication-element"
          // Access the email value like so:
          // onChange={(event) => {
          //  setEmail(event.value.email);
          // }}
          //
          // Prefill the email field like so:
          // options={{defaultValues: {email: 'foo@bar.com'}}}
        />
        <AddressElement
          id="address-element"
          options={{ mode: "billing", allowedCountries: ["AU"] }}
        />
        <PaymentElement id="payment-element" />
        <div className="mt-10 flex justify-end">
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
        </div>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
