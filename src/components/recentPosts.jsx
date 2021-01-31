import React from "react";

export function RecentPosts(props) {
  return (
    <div class="mx-auto max-w-4xl space-y-12">

      <div class="flex space-x-2 mb-4">
        <div class="text-2xl font-semibold">Recent Posts</div>
        <ViewAllButton />
      </div>

      <BlogsList />
    </div >
  )

}

export function ViewAllButton(props) {
  return (
    <div class=" px-2 flex border space-x-1 rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600">
      <div class=" text-sm self-center font-medium">View all</div>
      <svg class="self-center stroke-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  )
}

export function BlogsList(props) {
  return (
    <div class="flex flex-col space-y-8">
      <BlogsListElement
        date="Aug 1, 2020"
        tags={["Tools"]}
        title="My macOS Terminal setup"
        summary="A guide to setting up terminal on macOS with iTerm and ZSH"
      />
      <BlogsListElement
        date="Aug 25, 2019"
        tags={["Open-Source", "Programming"]}
        title="Google Summer of Code 2019"
        summary="This summer, as a part of my Google Summer of Code project, I worked with CERN-HSF on DiracGrid"
      />
    </div>
  )
}

export function BlogsListElement(props) {
  const tagsList = props.tags.join(", ")
  return (
    <div class="flex">
      <div class="w-1/5 " ><p class="text-base text-gray-600 font-mono">{props.date}</p></div>
      <div class="w-4/5 space-y-2 max-w-lg ">
        <div>
          <p class="text-base text-gray-600 font-mono">{tagsList}</p>
        </div>
        <div><h4 class="text-xl font-semibold">{props.title}</h4></div>
        <div><p class="text-base text-gray-600">{props.summary}</p></div>
      </div>
    </div>
  )
}