import React from "react";

import {
  SectionBackground,
  SectionContainer,
  SectionHeading,
  SectionDescription,
} from "@/components/ui/section";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: ReadonlyArray<FaqItem> = [
  {
    question: "Where is my audio stored?",
    answer:
      "In storage you control. We connect after you request access and we approve it.",
  },
  {
    question: "Do contributors need accounts?",
    answer: "No. They enter your Dataset ID in the app to upload.",
  },
  {
    question: "Can we have multiple datasets?",
    answer: "Yes. Create datasets for different teams or projects.",
  },
  {
    question: "Can I download recordings?",
    answer: "Yes. View and download from your dashboard anytime.",
  },
] as const;

export function FaqSection(): React.JSX.Element {
  return (
    <SectionBackground id="faq">
      <SectionContainer>
        <SectionHeading>Frequently asked questions</SectionHeading>
        <SectionDescription>
          Answers to the most common questions about Aural Portal.
        </SectionDescription>
        <Accordion
          type="single"
          collapsible
          className="mt-12 space-y-4"
        >
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index + 1}`}
              className="rounded-3xl border border-slate-200 bg-slate-50 last:border-b"
            >
              <AccordionTrigger className="px-6 text-left text-lg font-semibold text-slate-900 sm:px-8">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 text-base text-slate-600 sm:px-8">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionContainer>
    </SectionBackground>
  );
}
