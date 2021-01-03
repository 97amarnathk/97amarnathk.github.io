import { Link } from "gatsby";
import React from "react";

export function Footer() {
  return (
    <footer class = "bg-gray-200">
      <div class = "container mx-auto">
        <FooterLink href="/" text="RSS"/>
      </div>
    </footer>
  )
}

function FooterLink(props) {
  return (
    <div>
      <Link to={props.href} class="font-mono">{props.text}</Link>
    </div>
  )
}