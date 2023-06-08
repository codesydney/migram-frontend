# Migram

## About the Project

Migram is an acronym for Migrant Marketplace. It will help immigrants of refugee-background to generate some income by providing low-skilled work to the local community.

## Contributors

Thank you to our contributors.

- [seqprav](https://github.com/seqprav) - Technical Team Lead
- [s-sindinovic](https://github.com/s-sinadinovic) - Frontend Lead Developer
- [engramar](https://github.com/engramar) - Project Coordinator
- [LillianLuzinsky](https://github.com/LillianLuzinsky) - UI/UX Designer
- [rpgarde](https://github.com/rpgarde) - Frontend Developer
- [HDKHALILI](https://github.com/HDKHALILI) - Frontend Developer
- [ettienekorayyi](https://github.com/ettienekorayyi) - Frontend Developer
- [davidtaing](https://github.com/davidtaing) - Frontend Developer
- [capsap](https://github.com/capsap) - Frontend Developer
- [foadbotan](https://github.com/foadbotan) - Frontend Developer
- [OB1](https://github.com/OB-CODE) - Frontend Developer

## Technology

### Current Version - v3

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Payments via Stripe](https://stripe.com/au)
- [Authentication via Clerk](https://clerk.com/)

### Previous Versions

**[Express](https://expressjs.com/) (Depreciated since Version 3)**

The Clerk integration was brought in to simplify authentication and the remove the Users collection. This opened up an opportunity for a rewrite which resulted Migram v3, eliminating the need for the Express server.

**[Shopify Polaris Design System](https://polaris.shopify.com/) (Depreciated since Version 3)**

Shopify Polaris was brought in to speed up development as a signifant amount of time was being tied up with styling the components of v1. However the design system was specifically created for Admin Dashboards for Ecommerce Storefront Management. Due to this mismatch in the context and our use case, this resulted in UI being janky in a few places.

## Getting Started

### Setting Up pnpm

This project uses pnpm as the package manager.

To quickly setup pnpm you can install it as a global npm dependency.

```
$ npm i -g pnpm
```

### Setting up Environment Variables

First you'll need to open the `.env.example` file in the root directory and copy the contents into two new files:

- `.env.local`
- `.env.test.local`

This should setup the environment variables to connect to Migram.com's Heroku Express server instance.

### Installing the project dependencies

Run the following to install the NPM dependencies:

```
$ npm install
// or
$ npm i
```

## Running the Next.js Development Server and Tests

### Running Next.js in Development Mode

Run the following command to run the Next.js Development Server

```
$ npm run dev
```

### Running Jest Tests

```
$ npm run test
```

Alternatively, if you would like to run in watch mode. This will keep Jest running and will automatically re-run tests when you make any changes.

```
$ npm run test:watch
```

Note: The Environment Variables will be loaded in from the `.env.test.local` file.

### Building the Project

```
$ npm run dev
```

## Making Contributions

If you are new to making a pull request, please navigate to the Code.Sydney Playbook Guide on [Managing version control / branches / pull requests](https://github.com/codesydney/code-sydney-playbook/blob/main/docs/pull-request.md)
