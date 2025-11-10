import React, { ReactNode } from "react";

type SectionBackgroundProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function SectionBackground({
  children,
  id,
  className,
}: SectionBackgroundProps): React.JSX.Element {
  return (
    <section
      id={id}
      className={
        ["border-t border-slate-200 bg-white", className].filter(Boolean).join(
          " ",
        )
      }
    >
      {children}
    </section>
  );
}

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
};

export function SectionContainer({
  children,
  className,
}: SectionContainerProps): React.JSX.Element {
  return (
    <div
      className={
        ["mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8", className]
          .filter(Boolean)
          .join(" ")
      }
    >
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeading({
  children,
  id,
  className,
}: SectionHeadingProps): React.JSX.Element {
  return (
    <h2
      id={id}
      className={
        [
          "text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      {children}
    </h2>
  );
}

type SectionDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export function SectionDescription({
  children,
  className,
}: SectionDescriptionProps): React.JSX.Element {
  return (
    <p
      className={
        ["mt-4 max-w-2xl text-lg text-slate-600", className]
          .filter(Boolean)
          .join(" ")
      }
    >
      {children}
    </p>
  );
}
