import React from "react"
import { graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"

import "../styles/styles.scss"
import "./portfolio.scss"

const PortfolioPage = ({ data }) => {
  const articles = data.allPrismicPortfo.nodes
  return (
    <Layout>
      <SEO title="Portfolio" />
      <h1 className="mt-0">
        Portfolio
        {data.allPrismicPortfo.totalCount && (
          <sup>[{data.allPrismicPortfo.totalCount}]</sup>
        )}
      </h1>
      <div className="grid-x grid-margin-x">
        {articles &&
          articles.map(node => (
            <article className="cell large-6 grid-y card mb-2" key={node.uid}>
              <div className="cell auto">
                <h2 className="h1 mb-1 mt-0">
                  {RichText.asText(node.data.teaser.raw || node.data.title.raw)}
                </h2>
              </div>
              <div className="cell shrink">
                <Link to={`/portfolio/${node.uid}`} className="arrow-link">
                  {(node.data.teaser && RichText.asText(node.data.title.raw)) ||
                    "Read More"}
                </Link>
              </div>
              <div className="cell shrink">
                <Image
                  image={node.data.preview_image}
                  className="small-card-image"
                />
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
    allPrismicPortfo {
      totalCount
      nodes {
        data {
          title {
            raw
          }
          teaser {
            raw
          }
          preview_image {
            fluid(maxHeight: 510, maxWidth: 590) {
              ...GatsbyPrismicImageFluid_withWebp
            }
          }
        }
        uid
      }
    }
  }
`
