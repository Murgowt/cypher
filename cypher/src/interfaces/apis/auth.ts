import { z } from 'zod';

export const LoginResponseSchema = z.object({
  password: z.string(),
  orders: z.number(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  id: z.string(),
  isVerified: z.string(),
  token: z.string(),
  username: z.string()
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;