import React from "react";
import { DefaultLayout } from "../layouts/defaultLayout";

export default function Home() {
  return (
    <DefaultLayout>
      <h1>Hello Gatsby Updated!</h1>
      <p>Lorem ipsum dolores</p>
      <button class="primary-button">Click me</button>
    </DefaultLayout>
  );
}
