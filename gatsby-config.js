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
    "gatsby-plugin-preact",
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
        sassOptions: {
          includePaths: [`${__dirname}/src/styles`],
        },
      },
    },
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: "samhaakman", // (REQUIRED, replace with your own)
        accessToken: process.env.PRISMIC_TOKEN, // (optional API access token)
        prismicToolbar: process.env.NOW_GITHUB_COMMIT_REF === "staging",
        lang: "*",
        schemas: {
          portfo: require("./custom_types/portfo.json"),
          homepage: require("./custom_types/homepage.json"),
          page: require("./custom_types/page.json"),
        },
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
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: ["/preview"],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: ["/about", "/portfolio"],
      },
    },
  ],
}
