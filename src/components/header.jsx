import { Link } from "gatsby";
import React from "react";
import { SiteLogo } from "./common";

export default function Header() {
  return (
    <nav class="container mx-auto pt-6 flex items-center border-red-400 border-2">
      <Link to="/">
        <SiteLogo/>
      </Link>
      <div class="flex flex-grow justify-end border-blue-400 border-2">
        <HeaderLink name="About/" href = "/about"/>
        <HeaderLink name="Blog/" href = "/blog"/>
      </div>
    </nav>
  );
}

function HeaderLink(props) {
  return (
  <div class="mx-4">
    <Link to={props.href} class="font-mono text-l hover:underline">{props.name}</Link>
  </div>
  )
}
