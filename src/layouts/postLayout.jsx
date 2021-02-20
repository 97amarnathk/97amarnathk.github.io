import { format } from 'date-fns';
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { DefaultLayout } from "../layouts/defaultLayout";

export default ({ data }) => {
  const { frontmatter, body } = data.mdx;
  return (
    <DefaultLayout>
      <article class="mx-auto max-w-5xl">
        <header class="mb-12">
          <h1 class="my-2 text-4xl font-semibold">{frontmatter.title}</h1>
          <p>{format(new Date(frontmatter.date), "MMM dd, yyyy")}</p>
        </header>
        <MDXRenderer>{body}</MDXRenderer>
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