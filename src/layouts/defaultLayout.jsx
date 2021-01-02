import React from "react";
import Header from "../components/header";

export function DefaultLayout({ children }) {
  return (
    <div>
    <Header></Header>
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
      {children}
    </div>
    </div>
  );
}
