# Zdravniki - availbale doctors in Slovenia ( :construction: - work in progress)

Rewrite of [Zdravniki](https://github.com/sledilnik/zdravniki) with [Next.js](https://nextjs.org/).

You can check it [here](https://zdravniki-nextjs.vercel.app/sl/gp/).

## Develop

For setting up development environment locally run:

1. `yarn install`

## Data source

See .csv files in the [csv/](https://github.com/sledilnik/zdravniki-data/tree/main/csv) directory of [zdravniki-data](https://github.com/sledilnik/zdravniki-data) repository.

## API

### /api/v1

- /api/v1/:type
- /api/v1/:type/:doctorName

### /api/v2

- /api/v2/doctors
- /api/v2/doctors/:type
- /api/v2/doctor/:doctorName
- /api/v2/doctor/:doctorName/:instId
- /api/v2/institutions
- /api/v2/healthcheck

## Generic Next.js instructions (to be removed or minimized)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
