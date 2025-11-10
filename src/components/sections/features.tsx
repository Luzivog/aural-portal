import React from "react";

import {
  SectionBackground,
  SectionContainer,
  SectionHeading,
  SectionDescription,
} from "@/components/ui/section";
import type { LucideIcon } from "lucide-react";
import { Database, Download, Layers, Users } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const FEATURE_ITEMS = [
  {
    title: "Bring your own database/storage",
    description: "Use the storage your organization already trusts.",
    icon: Database,
  },
  {
    title: "Multi-dataset ready",
    description: "Organize recordings by project, team, or region.",
    icon: Layers,
  },
  {
    title: "Simple for contributors",
    description: "Install the app, enter your Dataset ID, and start recording.",
    icon: Users,
  },
  {
    title: "Clean downloads",
    description: "Browse recordings and export only what you need.",
    icon: Download,
  },
] as const satisfies ReadonlyArray<Feature>;

export function FeaturesSection(): React.JSX.Element {
  return (
    <SectionBackground
      id="features"
      className="relative overflow-hidden bg-slate-50"
    >
      <SectionContainer className="relative">
        <SectionHeading className="mt-8 text-balance text-center">
          Features made for teams
        </SectionHeading>
        <SectionDescription className="mx-auto text-balance text-center text-slate-600">
          Keep recordings organized and ready for action without giving up
          control.
        </SectionDescription>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {FEATURE_ITEMS.map((feature) => (
            <article
              key={feature.title}
              className="group relative rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
                <feature.icon aria-hidden="true" className="h-6 w-6" />
              </div>
              <h3 className="mt-8 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </SectionContainer>
    </SectionBackground>
  );
}
