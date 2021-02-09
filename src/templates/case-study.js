import React from "react"
import { graphql } from "gatsby"
import { RichText, Date, Link } from "prismic-reactjs"

import Layout from "../components/layout"
import SEO from "../components/seo"

import BigImage from "../components/bigImage"
import ContentBlock from "../components/contentBlock"
import Pullquote from "../components/pullquote"

import "../styles/styles.scss"

const Slice = ({ slice_type, ...props }) => {
  switch (slice_type) {
    case "big_image":
      return <BigImage image={props.primary.image} />
    case "content_block":
      return (
        <ContentBlock
          image={props.primary.image}
          alt={props.primary.image.alt}
          originalImage={props.primary.image}
          body={props.primary.body}
          alternateLayout={props.alternateLayout}
        />
      )
    case "pullquote":
      return <Pullquote pullquote={props.primary.pullquote} />
    default:
      return null
  }
}

const CaseStudy = ({ data }) => {
  const doc = data.allPrismicPortfo.nodes.slice(0, 1).pop().data
  if (!doc) {
    return null
  }
  return (
    <Layout className="page">
      <SEO title={RichText.asText(doc.title.raw)} />
      <div className="grid-x grid-margin-x grid-margin-y align-justify">
        <div className="cell large-4">
          <h1 className="mt-0">{RichText.asText(doc.title.raw)} </h1>
          {doc.teaser && (
            <h2 className="h3">{RichText.asText(doc.teaser.raw)} </h2>
          )}
          <div className="meta">
            {RichText.asText(doc.studio.raw)} <span className="separator" />{" "}
            <time>
              {Intl.DateTimeFormat("en-GB", {
                month: "long",
                year: "numeric",
              }).format(Date(doc.project_date))}
            </time>
          </div>
        </div>
        <div className="cell large-6">
          {RichText.render(doc.excerpt.raw)}
          <a
            href={Link.url(doc.site_link.url)}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {doc.site_link.url
              .replace("http://", "")
              .replace("https://", "")
              .slice(0, -1)}
          </a>
        </div>
      </div>
      <div>
        {doc.body1 &&
          doc.body1
            .filter(slice => !!slice.slice_type)
            .map((slice, key) => (
              <Slice key={key} alternateLayout={!!(key & 1)} {...slice} />
            ))}
      </div>
    </Layout>
  )
}

export default CaseStudy

export const query = graphql`
  query PortfolioQuery($uid: String) {
    allPrismicPortfo(filter: { uid: { eq: $uid } }) {
      nodes {
        data {
          title {
            raw
          }
          teaser {
            raw
          }
          studio {
            raw
          }
          site_link {
            url
          }
          excerpt {
            raw
          }
          project_date
          body1 {
            ... on PrismicPortfoBody1ContentBlock {
              id
              primary {
                body {
                  raw
                }
                image {
                  fluid(maxWidth: 1220) {
                    ...GatsbyPrismicImageFluid_withWebp
                  }
                  alt
                  url
                }
              }
              slice_type
            }
            ... on PrismicPortfoBody1Pullquote {
              id
              slice_type
              primary {
                pullquote {
                  raw
                }
              }
            }
            ... on PrismicPortfoBody1BigImage {
              id
              slice_type
              primary {
                image {
                  alt
                  url
                  fluid(maxWidth: 1220) {
                    ...GatsbyPrismicImageFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
