# Migram

## About the Project

Migram is an acronym for Migrant Marketplace. It will help immigrants of refugee-background to generate some income by providing low-skilled work to the local community.

## Contributors

Thank you to our contributors.

- [engramar](https://github.com/engramar) - Project Coordinator
- [davidtaing](https://github.com/davidtaing) - Fullstack Developer (Current Project Lead)
- [capsap](https://github.com/capsap) - Frontend Developer
- [foadbotan](https://github.com/foadbotan) - Frontend Developer
- [OB1](https://github.com/OB-CODE) - Frontend Developer
- [LillianLuzinsky](https://github.com/LillianLuzinsky) - UI/UX Designer

And thank you to those that worked on the previous versions of Migram. Without you, this would have not been possible. Thank you for the hours that you put in.

- [ettienekorayyi](https://github.com/ettienekorayyi) - Frontend Developer
- [rpgarde](https://github.com/rpgarde) - Frontend Developer
- [HDKHALILI](https://github.com/HDKHALILI) - Frontend Developer
- [seqprav](https://github.com/seqprav) - Technical Team Lead
- [s-sindinovic](https://github.com/s-sinadinovic) - Frontend Lead Developer

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

- `Seeding Your Local MongoDB Database`
- `Setting Up pnpm`
- `Installing Project Dependencies`
- `Setting up Environment Variables`

### Seeding Your Local MongoDB Database

To make it easier to get started, we have backed up our local MongoDB databases and have added these to the repository. This backup contains 5 Customer Users and 4 Service Provider Users.

To restore from the backup.

```
# may require sudo on Mac/Linux
./bin/seed_database.sh
```

**WARNING: this is a destructive action which will override your current database.**

### Setting Up pnpm

This project uses pnpm as the package manager.

To quickly setup pnpm you can install it as a global npm dependency.

```
$ npm i -g pnpm
```

### Installing Project Dependencies

Run the following to install the NPM dependencies:

```
$ pnpm install
// or
$ pnpm i
```

### Setting up Environment Variables

The easiest way to ask Dave for the local development configs. He'll shoot it over to you in a DM on the Code.Sydney Discord.

However, if you would like to add your own services. You'll need to open the `.env.example` file in the root directory and copy the contents into two new files:

- `.env.local`

## Running the Next.js Development Server and Tests

### Running Next.js in Development Mode

To run Next.js in development mode, run the `$ npm run dev` command.

### Building the Project

To build a production version of the project run the `$ npm run build` command. This is also a great way to test if there are any breaking TypeScript errors.

### Running Migram in Production Mode

Once the project has been built, you can run the project in Production Mode via the `$ pnpm start` command

## Making Contributions

If you are new to making a pull request, please navigate to the Code.Sydney Playbook Guide on [Managing version control / branches / pull requests](https://github.com/codesydney/code-sydney-playbook/blob/main/docs/pull-request.md)
