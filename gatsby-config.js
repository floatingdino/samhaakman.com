require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Sam Haakman`,
    description: `Building super fast websites that you love to see`,
    author: `Sam Haakman`,
    siteUrl: "https://samhaakman.com",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: "https://samhaakman.com",
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 100,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `samhaakman.com`,
        short_name: `sam`,
        start_url: `/`,
        background_color: `#fab2d7`,
        theme_color: `#fab2d7`,
        display: `minimal-ui`,
        icon: `src/images/fab.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        implementation: require("sass"),
        includePaths: [`${__dirname}/src/styles`],
      },
    },
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: "samhaakman", // (REQUIRED, replace with your own)
        accessToken: process.env.PRISMIC_TOKEN, // (optional API access token)
        path: "/preview",
        previews: process.env.NOW_GITHUB_COMMIT_REF === "staging",
        omitPrismicScript: process.env.NOW_GITHUB_COMMIT_REF !== "staging",
        pages: [
          {
            // (optional, builds pages dynamically)
            type: "Portfo", // TypeName from prismic
            match: "/portfolio/:uid", // Pages will be generated under this pattern
            path: "/portfolio/case-study", // Placeholder page for unpublished documents
            component: require.resolve("./src/templates/case-study.js"),
          },
          {
            type: "Page",
            match: "/:uid",
            path: "/page",
            component: require.resolve("./src/templates/page.js"),
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: "kiw7kqt",
        },
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: ["/about", "/portfolio"],
      },
    },
  ],
}
