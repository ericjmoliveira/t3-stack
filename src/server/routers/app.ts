import { z } from 'zod';

import { TRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const appRouter = TRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      message: `Hello ${input.text}!`
    };
  }),

  secret: protectedProcedure.query(() => {
    return {
      message: 'You can now view this secret message!'
    };
  })
});

export type AppRouter = typeof appRouter;
