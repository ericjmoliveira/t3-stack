import { initTRPC, TRPCError } from '@trpc/server';

import { Context } from './context';

const t = initTRPC.context<Context>().create();

export const TRPCRouter = t.router;

export const publicProcedure = t.procedure;

const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});

export const protectedProcedure = t.procedure.use(authMiddleware);
