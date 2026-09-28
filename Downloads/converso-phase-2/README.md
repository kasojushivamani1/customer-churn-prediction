# Converso

Practice the conversation before the real moment.

A marketplace where Practice Seekers book live video sessions with verified, real
Practice Partners (recruiters, founders, professors, sales leads) to rehearse a conversation
before it counts. No AI in the MVP.

## Stack

React + Vite + Tailwind CSS v4 (client), Node + Express 5 + Mongoose (server), MongoDB,
Firebase Authentication, Razorpay (Phase 5), Daily.co behind a provider adapter (Phase 6).
JavaScript throughout. INR only.

## Getting started

Requires Node 20.19+ and a running MongoDB (local or Atlas). From Phase 2 on you also need a
Firebase project - see **Firebase setup** below before your first run.

```bash
npm install
cp server/.env.example server/.env      # then edit MONGODB_URI and the Firebase Admin values
cp client/.env.example client/.env      # then edit the Firebase web app values
npm run dev                             # API on :5000, web on :5173
```

Check the API: http://localhost:5000/api/v1/health

| Script                | What it does                     |
| --------------------- | -------------------------------- |
| `npm run dev`         | Runs API and web together        |
| `npm run dev:server`  | API only (auto-restarts)         |
| `npm run dev:client`  | Web only                         |
| `npm run build`       | Production build of the client   |
| `npm run format`      | Prettier                         |

## Firebase setup

Authentication is real from Phase 2 on, so the server won't start and the client won't render
until both sides have a Firebase project to talk to.

1. Go to the [Firebase console](https://console.firebase.google.com) and create a project
   (Google Analytics can stay off).
2. **Authentication > Sign-in method**: enable **Email/Password** and **Google**.
3. **Project settings > General > Your apps**: add a **Web** app (the `</>` icon). Copy the
   `apiKey`, `authDomain`, `projectId` and `appId` it shows you into `client/.env` as
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID` and
   `VITE_FIREBASE_APP_ID`.
4. **Project settings > Service accounts**: click **Generate new private key**. It downloads a
   JSON file. From that file, copy `project_id`, `client_email` and `private_key` into
   `server/.env` as `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY`.
   The private key must stay on one line with its `\n` sequences literal and the whole value in
   quotes - `server/.env.example` shows the exact shape.
5. `localhost` is authorized for sign-in by default, so Google's popup flow works in dev without
   extra configuration.

Never commit a real `.env` file or the downloaded service-account JSON.

## Older macOS (Catalina 10.15)

Newer esbuild releases are built with Go 1.25, which needs macOS 12+ and fails on Catalina with
`dyld: Symbol not found: _SecTrustCopyCertificateChain`. The root `package.json` pins esbuild to
`0.25.8` through `overrides`, and Vite is held to the 7.1 line (which accepts that esbuild).
Do not remove the override or bump either version without testing on the older Mac.

## Structure

```
client/src
  app/          router (with auth/role guards) and app shell
  components/   ui (primitives), layout (navbar, footer, sections), shared (logo)
  features/
    auth/       AuthContext, RequireAuth/RequireRole guards, login/signup/onboarding pages
    landing/    the landing page
  lib/          utilities (cn, formatINR), firebase.js, api.js (fetch + auth header)
  pages/        DashboardPlaceholder, ComingSoon, NotFound
server/src
  config/       env validation (zod), database connection, Firebase Admin
  middleware/   verifyFirebaseToken, loadUser, requireRole, validate, notFound, errorHandler
  models/       User
  modules/      one folder per feature: routes -> controller (+schemas): health, auth, users
  routes/       mounts module routers under /api/v1
  services/     pricing (commission split), video (provider adapter)
```

## Decisions worth knowing

- **Commission is configuration, not code.** `PLATFORM_COMMISSION_PERCENT` has no default; the
  server refuses to start without it. It's currently set to 40 (the platform keeps 40%, the
  Practice Partner keeps 60%), but `calculateSplit()` in `services/pricing.service.js` reads that
  one value rather than having 40/60 written into the logic, so the split can change without
  touching code. Each booking will store the rate it was made under.
- **Accounts hold an array of roles**, not one fixed type. Onboarding adds `seeker` or `partner`
  to a new account; the schema already allows a person to hold both roles over time.
- **Auth is Firebase on both sides.** The client signs in with Firebase (email/password or
  Google) and calls `POST /auth/sync` with the resulting ID token, which creates or fetches the
  matching MongoDB user. Every other `/users` and (later) role-specific route re-verifies that
  same token via `firebase-admin` - the client is never trusted to say who it is on its own.
- **Video is swappable.** Everything goes through `getVideoProvider()`. Adding a vendor means one
  new file in `services/video/providers` and a `VIDEO_PROVIDER` value. The Daily implementation
  is a stub until Phase 6.
- **Availability is schedule-based.** Partners define weekly hours; open slots are generated from
  those hours at read time (Phase 4).
- **Partner verification is manual**, through an admin review queue (Phase 4).

## Auth foundation (Phase 2)

- `POST /api/v1/auth/sync` - verifies the caller's Firebase ID token and upserts the matching
  user. Called once automatically after every sign-in.
- `GET /api/v1/users/me` / `PATCH /api/v1/users/me` - read or update the signed-in account.
- `POST /api/v1/users/me/roles` - adds `seeker` or `partner` to the account (used by onboarding).
- On the client, `/login`, `/signup` and `/onboarding` are real; `/dashboard` and
  `/partner/dashboard` are placeholders gated by `RequireAuth` + `RequireRole`, there only to
  prove the whole path works. The real dashboards are built in Phase 3.
- Signing in updates the navbar (avatar, name, log out) without touching anything else on the
  landing page.

## Status

- [x] Phase 0: foundation
- [x] Phase 1: landing page
- [x] Phase 2: authentication
- [ ] Phase 3: dashboards
- [ ] Phase 4: partner profiles and availability
- [ ] Phase 5: booking and payments
- [ ] Phase 6: session page
- [ ] Phase 7: reviews and feedback
- [ ] Phase 8: hardening and deployment
