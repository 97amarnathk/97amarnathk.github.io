import React from "react";
import cartoon from "../assets/cartoon.png";

export function HeroSection() {
  return (
    <div class="mx-auto max-w-3xl flex flex-row justify-center">
      <Doodle class="w-2/3 pr-2" />
      <HeroAbout class="flex flex-col w-1/2 justify-center" />
    </div>
  )
}

function Doodle(props) {
  return (
    <div class={props.class}>
      < img src={cartoon} class="w-full" />
    </div>
  )
}

function HeroAbout(props) {
  return (
    <div class={props.class}>
      <h1 class="py-1 text-3xl font-semibold">Hey, I'm Amarnath</h1>
      <p class="text-base text-gray-700">
        I am a software engineer currently working at Amazon,where I primarily work on robot detection.
      </p>
      <GithubButton class="py-4" />
    </div>
  )
}

function GithubButton(props) {
  return (
    <div class={props.class}>
      <div class="inline-flex ">
        <a class="inline-flex items-center border border-gray-300 hover:border-gray-400  rounded-l-md py-0.5 px-1 bg-gray-50 hover:bg-gray-100" href="">
          <svg viewBox="0 0 16 16" class="mr-1" height="16px" width="16px"
            aria-hidden="true">
            <path fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
            </path>
          </svg>
          <div class="mr-1 text-sm font-medium">97amarnathk</div>
        </a>
        <a class="border-r  border-b border-t border-gray-300 rounded-r-md px-2 py-1 inline text-sm font-medium hover:text-blue-600" href="">22</a>
      </div >
    </div>
  )
}