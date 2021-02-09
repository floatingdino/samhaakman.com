const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicPortfo {
        nodes {
          uid
        }
      }
      allPrismicPage {
        nodes {
          uid
        }
      }
    }
  `)

  pages.data.allPrismicPortfo.nodes.forEach(portfo => {
    createPage({
      path: `/portfolio/${portfo.uid}`,
      component: path.resolve(__dirname, "src/templates/case-study.js"),
      context: { ...portfo },
    })
  })

  pages.data.allPrismicPage.nodes.forEach(page => {
    createPage({
      path: `/${page.uid}`,
      component: path.resolve(__dirname, "src/templates/page.js"),
      context: { ...page },
    })
  })
}
