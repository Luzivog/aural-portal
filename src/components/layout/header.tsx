"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

type NavLink = {
  href: string;
  label: string;
};

const NAV_LINKS: ReadonlyArray<NavLink> = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it Works" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Header(): React.JSX.Element {
  const handleNavClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) {
        return;
      }

      if (typeof window === "undefined" || typeof document === "undefined") {
        return;
      }

      const target = document.querySelector<HTMLElement>(href);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    },
    [],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.4)] backdrop-blur supports-backdrop-filter:bg-white/40 supports-backdrop-filter:backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70 dark:supports-backdrop-filter:bg-slate-900/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 transition-colors sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <Image
            src="/logo.svg"
            alt="Aural Portal logo"
            width={28}
            height={28}
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Aural Portal
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600/90 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="transition hover:text-slate-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild className="rounded-full shadow-lg shadow-blue-600/10">
            <Link href="/login">Request Access</Link>
          </Button>
        </div>
      </div>
      <nav className="border-t border-white/10 bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/30 supports-backdrop-filter:backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70 dark:supports-backdrop-filter:bg-slate-900/60 md:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 text-sm font-medium text-slate-600/90">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="transition hover:text-slate-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="rounded-full shadow-md shadow-blue-600/10">
            <Link href="/login">Request Access</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
