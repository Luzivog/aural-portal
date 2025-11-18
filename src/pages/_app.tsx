import type { AppType } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { SessionProvider } from "@/contexts/session-context";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc";
import type { NextPageWithAuth } from "@/types/page-with-auth";

import "../globals.css";

const App: AppType = ({ Component, pageProps }) => {
  const PageComponent = Component as NextPageWithAuth;
  const sessionState = authClient.useSession();
  const { data: session, isPending } = sessionState;
  const router = useRouter();
  const authMode = PageComponent.auth ?? "neutral";

  useEffect(() => {
    if (isPending) return;

    if (authMode === "protected" && !session) {
      router.replace("/login");
    } else if (authMode === "unprotected" && session) {
      router.replace("/dashboard");
    }
  }, [authMode, isPending, session, router]);

  const shouldBlock =
    authMode !== "neutral" &&
    (isPending ||
      (authMode === "protected" && !session) ||
      (authMode === "unprotected" && !!session));

  return (
    <SessionProvider value={sessionState}>
      {shouldBlock ? (
        <div className="flex min-h-svh items-center justify-center">
          <Spinner variant="ring" size={48} className="text-primary" />
        </div>
      ) : (
        <PageComponent {...pageProps} />
      )}
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
