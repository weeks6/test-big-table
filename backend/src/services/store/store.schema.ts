import z from 'zod';

export const StorePaginationQuerySchema = z.object({
	cursor: z.coerce.number().optional(),
	limit: z.coerce.number().min(1).max(100).optional(),
});

export type StorePaginationQuery = z.infer<typeof StorePaginationQuerySchema>;
