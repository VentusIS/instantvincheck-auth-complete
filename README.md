
# InstantVINCheck Extract (Carfax Page)

This is a minimal Next.js App Router project extracted from BidAtlanticCars,
containing the **Carfax History** flow:

- `/en/carfax-history` – VIN input + Carfax check + payment redirect
- `/en/payment-success` – after successful payment (redirected by your API)
- `/en/payment-cancel` – after cancelled payment

## Setup

1. Install deps:
   ```bash
   npm install
   ```

2. Create `.env.local` with:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://YOUR-API # same API used by BidAtlanticCars
   ```

3. Run dev:
   ```bash
   npm run dev
   ```

## Notes
- Axios + API routes are configured via `lib/axios.ts` and `lib/constants.ts`.
- The Carfax check uses `https://carstat.dev` endpoints defined in constants.
- Auth is expected to be the same as in BidAtlanticCars (Bearer token in localStorage).
  Make sure your API CORS allows the origin running this app.


### Auth pages
- `/en/login` and `/en/register` wired to your existing API routes (see `lib/constants.ts`).
