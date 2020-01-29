import React from "react"
import { graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import "../styles/styles.scss"

const IndexPage = ({ data }) => {
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  return (
    <Layout>
      <SEO title="Home" />
      <h1>
        {(doc && RichText.asText(doc.node.title)) ||
          "I'm Sam! Welcome to my website"}
      </h1>
      {doc && RichText.render(doc.node.body)}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            title
            body
          }
        }
      }
    }
  }
`
