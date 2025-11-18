import Head from "next/head";
import React from "react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { FeaturesSection } from "@/components/sections/features";
import { FaqSection } from "@/components/sections/faq";
import type { NextPageWithAuth } from "@/types/page-with-auth";

const Home: NextPageWithAuth = () => {
  return (
    <>
      <Head>
        <title>Aural Portal | Collect audio. Keep ownership.</title>
        <meta
          name="description"
          content="Aural Portal helps you collect audio through our mobile app while keeping ownership of your data."
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <Header />
        <main>
          <Hero />
          <FeaturesSection />
          <HowItWorksSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

Home.auth = "neutral";

export default Home;
