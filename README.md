#### 1. Styling & Framework Choice (Tailwind CSS)

- Although the task didn't explicitly mandate a specific CSS framework, I observed Tailwind CSS references within the Figma design (tokens/utility naming). I chose to use Tailwind to ensure the implementation is as close to the design specifications as possible and to maintain consistency with the provided layout.

#### 2. UI Constraints & Tag Logic

- While the API provides a large number of tags, the display is limited to two rows as per the design mockup. This prevents layout overflow and maintains the intended visual balance.

#### 3. Data Processing

- Used the he library to decode HTML entities from the API strings (e.g., converting &amp; to &), ensuring all text is human-readable and clean.

#### 4. API Configuration

- While I typically use environment variables for API URLs, I kept the URL in the code for this specific case. Since it is a public API with no sensitive keys, this makes the project "plug-and-play" for reviewers without needing extra .env setup.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
