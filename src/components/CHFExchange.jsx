"use client"

import React, { Suspense, useState } from 'react';
import { AppKitProvider } from '../config/AppkitProvider';
import Header from "./Header";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import Faqs from "./Faqs";
import HowToBuy from "./HowToBuy";
import About from "./About";
import AdminDashboard from './AdminPanel';

export default function CHFExchange() {
  const [isPack, setIsPack] = useState(true);

  return (
    <Suspense fallback="Loading...">
      <AppKitProvider>
        <div className="relative min-h-screen overflow-hidden">

          {/* Original Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00eeff] via-[#1e6dff] to-[#0096d1] bg-[length:200%_200%] animate-gradient-slow"></div>

          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

          {/* Particle Shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="particle animate-particle" />
            <div className="particle animate-particle delay-2000" />
            <div className="particle animate-particle delay-4000" />
            <div className="particle animate-particle delay-6000" />
          </div>

          {/* Page Content */}
          <div className="relative z-10">
            <Header isPack={isPack} />
            <LandingPage isPack={isPack}/>
            <About isPack={isPack}/>
            <HowToBuy isPack={isPack}/>
            <Faqs isPack={isPack}/>
            <Footer isPack={isPack}/>
          </div>
        </div>
      </AppKitProvider>
    </Suspense>
  );
}
