# 🚀 Next.js Project Setup Guide

Welcome! This guide will walk you through setting up a modern [Next.js](https://nextjs.org) project, complete with [Sanity](https://www.sanity.io/) for content management, [Clerk](https://clerk.dev/) for authentication, and [Stripe](https://stripe.com/) for payments.

---

## 📋 Table of Contents

- [🛠️ Getting Started](#getting-started)
- [📝 Sanity Setup](#sanity-setup)
- [🔐 Clerk Setup](#clerk-setup)
- [💳 Stripe Setup](#stripe-setup)
- [⏭️ Next Steps](#next-steps)

---

## 🛠️ Getting Started

1. **Prerequisites**
   Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

2. **Clone the Repository & Install Dependencies**
   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>
   npm install
   ```

---

## 📝 Sanity Setup

Sanity is used for content management and structured content storage.

### 1. **Create a Sanity Project**

- Go to [sanity.io](https://www.sanity.io/) and create a new project.
- Initialize a Sanity studio in your desired directory:
  ```bash
  npm create sanity@latest -- --project <Your-Project-ID> --dataset production --template clean --typescript --output-path StudioAppName
  cd StudioAppName
  ```

### 2. **Start the Sanity Studio**

- Start the development server:
  ```bash
  npm run dev
  ```
- Visit [http://localhost:3000/studio](http://localhost:3000/studio) to view the dashboard.

### 3. **Configure Environment Variables**

- In your Next.js project root, add these to your `.env.local`:
  ```env
  NEXT_PUBLIC_BASE_URL="http://localhost:3000"
  SANITY_STUDIO_PROJECT_ID="<Your-Project-ID>"
  SANITY_STUDIO_DATASET="production"
  ```
  > **Replace** `<Your-Project-ID>` with your actual Sanity project ID.

---

## 🔐 Clerk Setup

Clerk lets you add authentication to your app with ease.

### 1. **Install Clerk**

```bash
npm install @clerk/nextjs --legacy-peer-deps
```

### 2. **Set Clerk Environment Variables**

- From the [Clerk Dashboard](https://dashboard.clerk.dev/), copy your Publishable Key and Secret Key.
- Add to `.env.local`:
  ```env
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<Your-Clerk-Publishable-Key>"
  CLERK_SECRET_KEY="<Your-Clerk-Secret-Key>"
  ```
  > **Replace** with your actual keys from Clerk.

### 3. **Wrap Your App with ClerkProvider**

- Edit `app/layout.tsx`:
  ```tsx
  import { ClerkProvider } from '@clerk/nextjs';

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <ClerkProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ClerkProvider>
    );
  }
  ```

---

## 💳 Stripe Setup

Enable payments and order processing with Stripe.

### 1. **Install Stripe**

```bash
npm install stripe --legacy-peer-deps
```

### 2. **Activate Stripe & Forward Webhooks**

- Log in to Stripe:
  ```bash
  stripe login
  ```
- Forward Stripe events to your local webhook endpoint:
  ```bash
  stripe listen --forward-to localhost:3000/webhook
  ```

### 3. **Trigger Stripe Events (Optional)**

- To simulate a successful payment in your development environment:
  ```bash
  stripe trigger payment_intent.succeeded
  ```

---

## ⏭️ Next Steps

- Explore Next.js documentation to leverage advanced features.
- Extend your Sanity studio with custom schemas.
- Customize authentication flows with Clerk.
- Integrate Stripe fully for checkout and order management.

---

**Happy Coding! 🚀**