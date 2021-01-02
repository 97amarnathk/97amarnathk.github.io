import { ThreeBarsIcon, XIcon } from "@primer/octicons-react";
import React from "react";
import { SiteLogo } from "./common";

export default function Header() {
  return (
    <nav class="">
      <div class="container-lg py-4 flex-wrap flex-md-nowrap p-responsive flex-md-justify-between flex-column flex-md-row p-responsive d-flex flex-items-center">
        <div class="d-flex flex-justify-between flex-items-center flex-self-stretch">
          <a href="/" class="d-flex flex-items-center muted-link ">
           <SiteLogo/>
          </a>
          <div
            class="close-button d-inline d-md-none"
            id="header-responsive-toggle flex-self-center"
            onclick="toggle_header_links();"
          >
            <div class="close-button" id="expand-nav-button">
              <ThreeBarsIcon />
            </div>
            <div class="d-none close-button" id="contract-nav-button">
              <XIcon />
            </div>
          </div>
        </div>

        {/* <div class="d-md-flex flex-justify-center flex-column flex-md-row flex-self-stretch mt-2 mt-lg-0 d-none"
        id="header-links">
        {% for page in site.pages %}
        {% if page.title %}
        <div class="mr-0 mr-lg-3">
          <a href="{{ page.url | prepend: site.baseurl }}"
            class="btn btn-invisible link-gray-dark d-flex flex-justify-center flex-self-stretch py-2 text-mono text-normal f4">{{ page.title }}/</a>
        </div>
        {% endif %}
        {% endfor %}
        <div class="mr-0 mr-lg-3">
          <a href="{{ "/blog" | prepend: site.baseurl }}"
            class="btn btn-invisible link-gray-dark d-flex flex-justify-center flex-self-stretch py-2 text-mono text-normal f4">Blog/</a>
        </div>
        <hr>
      </div> */}
      </div>
    </nav>
  );
}
