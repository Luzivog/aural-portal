import React from "react";
import {
  AudioWaveform,
  KeyRound,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SectionBackground,
  SectionContainer,
  SectionDescription,
  SectionHeading,
} from "@/components/ui/section";

type Step = {
  title: string;
  description: string;
  caption: string;
  icon: LucideIcon;
};

const HOW_IT_WORKS_STEPS: ReadonlyArray<Step> = [
  {
    title: "Request access",
    description:
      "Let us know which storage provider you already trust, and who should own the keys.",
    caption: "Secure workflow takes less than 2 minutes.",
    icon: KeyRound,
  },
  {
    title: "Get approved",
    description:
      "Our team validates the connection, sets the right permissions, and signs the data sharing agreement.",
    caption: "Verification typically completed within one business day.",
    icon: ShieldCheck,
  },
  {
    title: "Start recording",
    description:
      "Share your Dataset ID so contributors can upload safely, while you monitor and download whenever you need.",
    caption: "Real-time uploads and simple exports from your dashboard.",
    icon: AudioWaveform,
  },
] as const;

export function HowItWorksSection(): React.JSX.Element {
  return (
    <SectionBackground
      id="how-it-works"
      className="relative bg-slate-50"
    >
      <SectionContainer className="relative z-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <SectionHeading className="mt-6 text-balance text-slate-900">
              How it works
            </SectionHeading>
            <SectionDescription className="leading-relaxed text-slate-600/90">
              Three polished steps that keep your organization&apos;s audio
              secure from day one, without slowing your team down.
            </SectionDescription>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card
                key={step.title}
                className="group relative overflow-hidden border-slate-200/60 bg-white/80 px-2 py-10 shadow-lg shadow-slate-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue-200/80 hover:shadow-xl"
              >
                <CardHeader className="relative z-10 flex flex-col gap-6 px-6">
                  <div className="flex items-center justify-between gap-4">
                    <Badge
                      variant="muted"
                      className="border-transparent bg-slate-100/80 text-xs font-semibold uppercase tracking-[0.17em] text-slate-500"
                    >
                      Step {index + 1}
                    </Badge>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-inner shadow-blue-200/40">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-semibold text-slate-900">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 flex flex-col gap-4 px-6 pb-2">
                  <p className="text-base leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <span className="h-1.5 w-8 rounded-full bg-blue-500" />
                    {step.caption}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </SectionContainer>
    </SectionBackground>
  );
}
