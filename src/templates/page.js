import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/styles.scss"

const Page = ({ data }) => {
  const doc = data.prismic.allPages.edges.slice(0, 1).pop()
  if (!doc) {
    return null
  }
  return (
    <Layout className="page">
      <SEO title={RichText.asText(doc.node.page_title)} />
      <div class="grid-x grid-margin-x align-center mb-4">
        <div class="cell large-6">
          <h1>{doc && RichText.asText(doc.node.page_title)}</h1>
          {doc && RichText.render(doc.node.body)}
        </div>
      </div>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query PageQuery($uid: String) {
    prismic {
      allPages(uid: $uid) {
        edges {
          node {
            page_title
            body
          }
        }
      }
    }
  }
`
