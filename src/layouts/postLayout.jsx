import { format } from 'date-fns';
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { DefaultLayout } from "../layouts/defaultLayout";

export default ({ data }) => {
  const { frontmatter, body } = data.mdx;
  const date = format(new Date(frontmatter.date), "MMM dd, yyyy")
  return (
    <DefaultLayout>
      <article class="mx-auto max-w-5xl">
        <header class="mb-12">
          <h1 class="my-2 text-4xl font-semibold">{frontmatter.title}</h1>
          <div class="flex space-x-16">
            <p class="text-base text-gray-600 font-mono">{date}</p>
            <p class="text-base text-gray-600 font-mono">Tools</p>
          </div>
        </header>
        <div class="markdown">
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </article>

    </DefaultLayout >
  )
}

export const query = graphql`
  query PostsBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date
      }
    }
  }
`;