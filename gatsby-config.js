const siteMetadata = {
  title: "Amarnath",
  description: "my blog",
};

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/posts`,
        name: "posts",
      },
    },
    "gatsby-plugin-postcss",
  ],
};
