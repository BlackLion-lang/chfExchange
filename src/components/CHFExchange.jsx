"use client"

import React, { Suspense, useState } from 'react';
import { AppKitProvider } from '../config/AppkitProvider';
import Header from "./Header";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import Faqs from "./Faqs";
import HowToBuy from "./HowToBuy"

export default function CHFExchange() {
  const [isPack, setIsPack] = useState(true);

  return (
    <Suspense fallback="Loading...">
      <AppKitProvider>
        <div className="min-h-screen gradient-bg">
          <Header isPack={isPack} />

          {/* LandingPage no longer needs manual wallet props,
              it can use AppKit (wagmi) hooks internally */}
          <LandingPage isPack={isPack}/>

          <HowToBuy isPack={isPack}/>

          <Faqs isPack={isPack}/>

          <Footer isPack={isPack}/>
        </div>
      </AppKitProvider>
    </Suspense>
  );
}
