import { z } from 'zod';

export const getUserListSchema = z.object({
  q: z.string().optional(),
  page_number: z
    .string()
    .optional()
    .default('1')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, { message: 'Page number must be greater than 0.' }),
  limit: z
    .string()
    .optional()
    .default('10')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, { message: 'Limit must be greater than 0.' }),
});

export const addUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email().min(5).max(50),
  image: z.string(),
});

export const deleteUserSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});
