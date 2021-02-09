import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/styles.scss"

const Page = ({ data }) => {
  const doc = data.allPrismicPage.nodes.slice(0, 1).pop().data
  if (!doc) {
    return null
  }
  return (
    <Layout className="page">
      <SEO title={doc.page_title.text} />
      <div class="grid-x grid-margin-x align-center mb-4">
        <div class="cell large-6">
          <h1 class="mt-0">{doc && doc.page_title.text}</h1>
          {doc && RichText.render(doc.body.raw)}
        </div>
      </div>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query PageQuery($uid: String) {
    allPrismicPage(filter: { uid: { eq: $uid } }) {
      nodes {
        data {
          page_title {
            text
          }
          body {
            raw
          }
        }
      }
    }
  }
`
