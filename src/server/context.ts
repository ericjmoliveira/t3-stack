import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { inferAsyncReturnType } from '@trpc/server';

import { getAuthSession } from './auth';
import { prisma } from './db';

export async function createContext(options: CreateNextContextOptions) {
  const { req, res } = options;
  const session = await getAuthSession({ req, res });

  return { session, prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
