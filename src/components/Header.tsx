"use client";

import { UserMetadata } from "@/backend/services/users/types";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Tasks", href: "/tasks" },
  { name: "Offers", href: "/offers" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();

  const userMetadata = user?.publicMetadata as UserMetadata | undefined;

  const userRole = userMetadata?.role;

  return (
    <header className="absolute inset-x-0 top-0 z-50 mx-auto max-w-2xl lg:max-w-7xl ">
      <nav
        className="flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-8 w-auto" src="/logo.png" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          <UserTypeBadge type={userRole}></UserTypeBadge>
          <ClerkLoginButtons />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <UserTypeBadge type={userRole}></UserTypeBadge>
              </div>
              <div className="py-6">
                <ClerkLoginButtons />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export function ClerkLoginButtons() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}

export function UserTypeBadge({
  type,
}: {
  type?: "customer" | "service-provider";
}) {
  if (type === "customer") return <CustomerBadge />;
  if (type === "service-provider") return <ServiceProviderBadge />;

  return null;
}

export function CustomerBadge() {
  return (
    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
      <svg
        className="h-1.5 w-1.5 fill-green-500"
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      Customer
    </span>
  );
}

export function ServiceProviderBadge() {
  return (
    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
      <svg
        className="h-1.5 w-1.5 fill-blue-500"
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      Service Provider
    </span>
  );
}
