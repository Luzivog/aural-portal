import Link from "next/link";
import React from "react";

type NavLink = {
  href: string;
  label: string;
};

const FOOTER_LINKS: ReadonlyArray<NavLink> = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex flex-col items-center gap-4 px-4 py-10 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-slate-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400">
          © {currentYear} Aural Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
