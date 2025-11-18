import type { NextPage } from "next";

export type PageAuthMode = "protected" | "unprotected" | "neutral";

export type NextPageWithAuth<
  P = Record<string, never>,
  IP = P,
> = NextPage<P, IP> & {
  auth?: PageAuthMode;
};
