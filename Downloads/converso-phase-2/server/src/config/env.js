import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  CLIENT_URL: z.string().url().default('http://localhost:5173'),

  // No default on purpose: the commission is a business decision, not a code constant.
  // Currently 40 (the platform keeps 40%, the Practice Partner keeps 60%) - see .env.example.
  PLATFORM_COMMISSION_PERCENT: z.coerce
    .number({ invalid_type_error: 'PLATFORM_COMMISSION_PERCENT must be a number' })
    .min(0)
    .max(100),

  VIDEO_PROVIDER: z.string().min(1).default('daily'),

  // Firebase Admin (server-side token verification). See README > Firebase setup.
  FIREBASE_PROJECT_ID: z.string().min(1, 'FIREBASE_PROJECT_ID is required'),
  FIREBASE_CLIENT_EMAIL: z.string().min(1, 'FIREBASE_CLIENT_EMAIL is required'),
  FIREBASE_PRIVATE_KEY: z.string().min(1, 'FIREBASE_PRIVATE_KEY is required'),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:');
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  }
  console.error('Copy server/.env.example to server/.env and fill in the values.');
  process.exit(1);
}

export const env = Object.freeze(parsed.data);
