"use client";

import { useState } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import { useSessionContext } from "@/contexts/session-context";
import { authClient } from "@/lib/auth-client";
import type { NextPageWithAuth } from "@/types/page-with-auth";

const DashboardPage: NextPageWithAuth = () => {
  const { data: session } = useSessionContext();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    setError(null);

    try {
      const response = await authClient.signOut();

      if (response?.error) {
        setError(response.error.message ?? "Failed to log out. Please try again.");
        return;
      }

      router.replace("/login");
    } catch {
      setError("An unexpected error occurred while logging out.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground mb-2">Email:</p>
          <p className="text-lg font-semibold">{session.user.email}</p>
        </div>
        {error && (
          <p className="text-destructive mt-4 text-sm" role="alert">
            {error}
          </p>
        )}
        <Button
          className="mt-6 w-full"
          onClick={handleLogout}
          disabled={isLoggingOut}
          variant="outline"
        >
          {isLoggingOut ? "Logging out..." : "Log out"}
        </Button>
      </div>
    </div>
  );
};

DashboardPage.auth = "protected";

export default DashboardPage;
