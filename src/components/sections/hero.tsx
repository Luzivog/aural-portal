import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

import Iphone15Pro from "../iphone-15-pro";

export function Hero(): React.JSX.Element {
  return (
    <section
      className="bg-white py-20 sm:py-24 lg:flex lg:items-center lg:py-0 min-h-[calc(100vh-4rem)]"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-8">
        <div className="max-w-2xl space-y-8 lg:flex-1">
          <h1
            id="hero-heading"
            className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Collect audio. Keep ownership.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            Invite your team to record with our mobile app while you keep your
            data in your own database.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/login">Request Access</Link>
            </Button>
            <Button
              asChild
              variant="link"
              className="text-base font-semibold text-blue-600 hover:text-blue-700"
            >
              <Link href="/login">Already a member? Log in</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center h-[80vh]">
          <Iphone15Pro
            src="/app-screenshot.png"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
