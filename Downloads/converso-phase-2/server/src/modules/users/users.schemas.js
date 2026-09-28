import { z } from 'zod';

export const updateMeSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    phone: z.string().trim().max(20).optional(),
    timezone: z.string().trim().min(1).max(64).optional(),
  })
  .strict();

export const addRoleSchema = z
  .object({
    // "admin" is intentionally not assignable through this endpoint.
    role: z.enum(['seeker', 'partner']),
  })
  .strict();
