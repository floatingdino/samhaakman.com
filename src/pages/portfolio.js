import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { RichText } from "prismic-reactjs"

import { linkResolver } from "../utils/linkResolver"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/styles.scss"
import "./portfolio.scss"

const PortfolioPage = ({ data }) => {
  const articles = data.prismic.allPortfos.edges
  return (
    <Layout>
      <SEO title="Portfolio" />
      <h1 className="mt-0">
        Portfolio
        {data.prismic.allPortfos.totalCount && (
          <sup>[{data.prismic.allPortfos.totalCount}]</sup>
        )}
      </h1>
      <div className="grid-x grid-margin-x">
        {articles &&
          articles.map(({ node }) => (
            <article
              className="cell large-6 grid-y card mb-2"
              key={node._meta.uid}
            >
              <div className="cell auto">
                <h2 className="h1 mb-1 mt-0">
                  {RichText.asText(node.teaser || node.title)}
                </h2>
              </div>
              <div className="cell shrink">
                <Link to={linkResolver(node._meta)} className="arrow-link">
                  {(node.teaser && RichText.asText(node.title)) || "Read More"}
                </Link>
              </div>
              <div className="cell shrink">
                {(node.preview_imageSharp &&
                  node.preview_imageSharp.childImageSharp && (
                    <Img
                      fluid={node.preview_imageSharp.childImageSharp.fluid}
                      alt={node.preview_image.alt}
                      className="small-card-image"
                      style={{ display: "block" }}
                    />
                  )) || (
                  <img
                    src={node.preview_image.url}
                    alt={node.preview_image.alt}
                    className="small-card-image"
                    style={{ display: "block" }}
                  />
                )}
              </div>
            </article>
          ))}
      </div>
    </Layout>
  )
}

export default PortfolioPage

export const query = graphql`
  {
    prismic {
      allPortfos(sortBy: project_date_DESC) {
        totalCount
        edges {
          node {
            title
            preview_image
            preview_imageSharp {
              childImageSharp {
                fluid(maxWidth: 590, maxHeight: 510) {
                  ...GatsbyImageSharpFluid_withWebp
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
