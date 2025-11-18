// server/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { auth } from "@/lib/auth";
import { mongoClient } from "@/lib/mongoClient";

// Inner context: stuff that doesn't depend on the HTTP request
export async function createInnerContext() {
  return {
    db: mongoClient.db("auth"),
  };
}

// Outer context: per-request, includes Better Auth session & headers
export async function createContext(opts: FetchCreateContextFnOptions) {
  const inner = await createInnerContext();

  // Better Auth: get session from cookies in this request
  // https://www.better-auth.com/docs/integrations/next#getting-session-on-a-rsc-or-server-action :contentReference[oaicite:4]{index=4}
  const session = await auth.api.getSession({
    headers: opts.req.headers,
  });

  return {
    ...inner,
    session,             // Better Auth session or null
    req: opts.req,
    resHeaders: opts.resHeaders, // useful if you later want to set cookies from tRPC
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

// Standard tRPC v11 initialization with typed context
// https://trpc.io/docs/server/context :contentReference[oaicite:5]{index=5}
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // Narrow session to non-null for downstream resolvers
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});
