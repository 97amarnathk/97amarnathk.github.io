import React from "react";
import { SiteLogo } from "./common";

export default function Header() {
  return (
    <nav class="p-6">
      <div class="container mx-auto flex items-center ">
      <a href="/">
        <SiteLogo/>
      </a>
      <div class="flex flex-grow justify-end">
        <HeaderLink name="About/" href = "/about"/>
        <HeaderLink name="Blog/" href = "/blog"/>
      </div>
      </div>
      
    </nav>
  );
}

function HeaderLink(props) {
  return (
  <div class="mx-4">
    <a href={props.href} class="font-mono text-xl hover:underline">{props.name}</a>
  </div>
  )
}
