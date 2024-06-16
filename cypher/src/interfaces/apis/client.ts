import { z } from 'zod';

export const OrderSchema = z.object({
    budget: z.number(),
    milestones: z.number(),
    status: z.enum(['open', 'active', 'completed']),
    wizardRating: z.number(),
    finalPrice: z.number().nullable(),
    clientId: z.string(),
    tech: z.string(),
    completedMilestones: z.number(),
    clientRating: z.number(),
    description: z.string(),
    id: z.string(),
    wizardId: z.string(),
    title: z.string(),
    creationtimestamp: z.number()
  });

export type Order = z.infer<typeof OrderSchema>;

export const AllOrdersResponseSchema = z.object({
    openOrders: z.array(OrderSchema),
    activeOrders: z.array(OrderSchema),
    completedOrders: z.array(OrderSchema)
  });

export type AllOrdersResponse = z.infer<typeof AllOrdersResponseSchema>;