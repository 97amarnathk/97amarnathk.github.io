import React from "react";
import { Footer } from "../components/footer";
import Header from "../components/header";

export function DefaultLayout({ children }) {
  return (
    <div class="h-screen flex flex-col">
      <Header />
      <div class="flex-grow flex flex-col container mx-auto" >
        <section class="px-2 py-2 pb-md-6 items-center">
          {children}
        </section>
      </div>
      <Footer />
    </div>
  );
}


