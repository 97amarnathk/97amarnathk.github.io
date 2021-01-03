import React from "react";
import { Footer } from "../components/footer";
import Header from "../components/header";

export function DefaultLayout({ children }) {
  return (
    <div class="h-screen flex flex-col">
    <Header/>
    <div class = "flex-grow" >
      {children}
    </div>
    <Footer/>
    </div>
  );
}


