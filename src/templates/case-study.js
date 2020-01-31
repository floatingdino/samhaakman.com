import React from "react"
import { graphql } from "gatsby"
import { RichText, Date, Link } from "prismic-reactjs"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/styles.scss"

const Page = ({ data }) => {
  const doc = data.prismic.allPortfos.edges.slice(0, 1).pop()
  if (!doc) {
    return null
  }
  console.log(doc.node.site_link)
  return (
    <Layout className="page">
      <SEO title={RichText.asText(doc.node.title)} />
      <div className="grid-x grid-margin-x align-justify">
        <div className="cell large-4">
          <h1 className="mt-0">{RichText.asText(doc.node.title)}</h1>
          {doc.node.teaser && <h2>{RichText.asText(doc.node.teaser)}</h2>}
          <div>
            {RichText.asText(doc.node.studio)} <span className="separator" />{" "}
            <time>
              {Intl.DateTimeFormat("en-GB", {
                month: "long",
                year: "numeric",
              }).format(Date(doc.node.project_date))}
            </time>
          </div>
        </div>
        <div className="cell large-6">
          {RichText.render(doc.node.excerpt)}
          <a
            href={Link.url(doc.node.site_link)}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {doc.node.site_link.url
              .replace("http://", "")
              .replace("https://", "")
              .slice(0, -1)}
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query PortfolioQuery($uid: String) {
    prismic {
      allPortfos(uid: $uid) {
        edges {
          node {
            title
            teaser
            studio
            site_link {
              ... on PRISMIC__ExternalLink {
                url
              }
            }
            excerpt
            project_date
          }
        }
      }
    }
  }
`
