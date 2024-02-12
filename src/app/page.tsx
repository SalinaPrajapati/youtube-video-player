"use client";

import ReduxProvider from "@/store/ReduxProvider";
import Navbar from "@/components/Navbar";
import Youtube from "@/components/Youtube";

export default function HomePage() {
  return (
    <>
      <ReduxProvider>
        <Navbar />
        <Youtube />
      </ReduxProvider>
    </>
  );
}
