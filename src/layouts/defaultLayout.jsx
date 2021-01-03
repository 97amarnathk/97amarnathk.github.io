import React from "react";
import { Footer } from "../components/footer";
import Header from "../components/header";

export function DefaultLayout({ children }) {
  return (
    <div class="h-screen flex flex-col border-green-400 border-2">
    <Header/>
    <div class = "flex-grow" >
      {children}
    </div>
    <Footer/>
    </div>
  );
}


