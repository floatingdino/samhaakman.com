module.exports = {
  siteMetadata: {
    title: `SamHaakman.com`,
    description: `I build really fast websites that look good`,
    author: `Sam Haakman`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `samhaakman.com`,
        short_name: `sam`,
        start_url: `/`,
        background_color: `#4F304C`,
        theme_color: `#4F304C`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
   resolve: 'gatsby-source-prismic-graphql',
     options: {
       repositoryName: 'samhaakman', // (REQUIRED, replace with your own)
       accessToken: 'MC5YakFsNXhVQUFDY0FDZlpX.77-9R--_vRnvv70y77-977-9Lu-_ve-_vW7vv719dhDvv700Te-_ve-_vQxr77-977-977-9IO-_vRhfKjA', // (optional API access token)
       path: '/preview', // (optional preview path. Default: /preview)
       previews: true, // (optional, activated Previews. Default: false)
       pages: [{ // (optional, builds pages dynamically)
         type: 'Portfolio',         // TypeName from prismic
         match: '/portfolio/:uid',  // Pages will be generated under this pattern
         path: '/portfolio',        // Placeholder page for unpublished documents
         component: require.resolve('./src/templates/case-study.js'),
       }],

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
