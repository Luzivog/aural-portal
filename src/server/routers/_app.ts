// server/routers/_app.ts
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const appRouter = router({
  health: publicProcedure.query(() => "ok"),

  me: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
});

export type AppRouter = typeof appRouter;
