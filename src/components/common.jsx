import { ThreeBarsIcon, XIcon } from "@primer/octicons-react";
import React from "react";

export function SiteLogo() {
  return (
    <div class="font-mono text-white bg-gray-900 text-2xl p-2 py-1 rounded-md">
      {"amrnth>"}
    </div>
  )
  //f2 text-mono bg-gray-9 text-white d-inline px-2 py-0 rounded-2
}

export function NavToggle() {
  return (
    <div
      class="close-button d-inline d-md-none"
      id="header-responsive-toggle flex-self-center"
      onclick="toggle_header_links();"
    >
      <div class="close-button" id="expand-nav-button">
        <ThreeBarsIcon/>
      </div>
      <div class="d-none close-button" id="contract-nav-button">
        <XIcon />
      </div>
    </div>
  )
}