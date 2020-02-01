import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { RichText, Date } from "prismic-reactjs"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { linkResolver } from "../utils/linkResolver"

import "../styles/styles.scss"
import "./index.scss"

const IndexPage = ({ data }) => {
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  const articles = data.prismic.allPortfos.edges
  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="mt-0">
        {(doc && RichText.asText(doc.node.title)) ||
          "I'm Sam! Welcome to my website"}
      </h1>
      {doc && RichText.render(doc.node.body)}
      <div className="article-wrapper">
        {articles &&
          articles.map(({ node }) => (
            <article className="card mb-2" key={node._meta.uid}>
              <div className="grid-x align-justify">
                <div className="cell large-4 small-8 grid-y">
                  <div className="cell auto grid-y align-center">
                    <h2 className="h1 mb-1">
                      {RichText.asText(node.teaser || node.title)}
                    </h2>
                    <Link to={linkResolver(node._meta)} className="arrow-link">
                      {(node.teaser && RichText.asText(node.title)) ||
                        "Read More"}
                    </Link>
                  </div>
                  <div className="cell shrink meta mt-1">
                    {RichText.asText(node.studio)}{" "}
                    <span className="separator" />{" "}
                    <time>
                      {Intl.DateTimeFormat("en-GB", {
                        month: "long",
                        year: "numeric",
                      }).format(Date(node.project_date))}
                    </time>
                  </div>
                </div>
                <div className="cell large-shrink">
                  {(node.preview_imageSharp &&
                    node.preview_imageSharp.childImageSharp && (
                      <Img
                        fixed={node.preview_imageSharp.childImageSharp.fixed}
                        alt={node.preview_image.alt}
                        className="large-card-image"
                        style={{ display: "block" }}
                      />
                    )) || (
                    <img
                      src={node.preview_image.url}
                      alt={node.preview_image.alt}
                      className="large-card-image"
                      style={{ display: "block" }}
                    />
                  )}
                </div>
              </div>
            </article>
          ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    prismic {
      allHomepages(first: 1) {
        edges {
          node {
            title
            body
          }
        }
      }
      allPortfos(sortBy: project_date_DESC, first: 3) {
        edges {
          node {
            title
            teaser
            studio
            project_date
            preview_image
            preview_imageSharp {
              childImageSharp {
                fixed(height: 560) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            _meta {
              uid
              type
            }
          }
        }
      }
    }
  }
`
