"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import { authClient } from "@/lib/auth-client";

export type SessionState = ReturnType<typeof authClient["useSession"]>;

const SessionContext = createContext<SessionState | undefined>(undefined);

interface SessionProviderProps {
  value: SessionState;
  children: ReactNode;
}

export const SessionProvider = ({ value, children }: SessionProviderProps) => (
  <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
);

export const useSessionContext = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSessionContext must be used within SessionProvider");
  }

  return context;
};
