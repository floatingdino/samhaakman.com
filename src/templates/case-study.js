import React from "react"
import { graphql } from "gatsby"
import { RichText, Date, Link } from "prismic-reactjs"

import Layout from "../components/layout"
import SEO from "../components/seo"

import BigImage from "../components/bigImage"
import ContentBlock from "../components/contentBlock"
import Pullquote from "../components/pullquote"

import "../styles/styles.scss"

const Slice = ({ type, ...props }) => {
  switch (type) {
    case "big_image":
      return (
        <BigImage
          image={props.primary.imageSharp}
          alt={props.primary.image.alt}
          original_image={props.primary.image}
        />
      )
    case "content_block":
      return (
        <ContentBlock
          image={props.primary.imageSharp}
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

const Page = ({ data }) => {
  const doc = data.prismic.allPortfos.edges.slice(0, 1).pop()
  if (!doc) {
    return null
  }
  return (
    <Layout className="page">
      <SEO title={RichText.asText(doc.node.title)} />
      <div className="grid-x grid-margin-x grid-margin-y align-justify">
        <div className="cell large-4">
          <h1 className="mt-0">{RichText.asText(doc.node.title)} </h1>
          {doc.node.teaser && (
            <h2 className="h3">{RichText.asText(doc.node.teaser)} </h2>
          )}
          <div className="meta">
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
      <div>
        {doc.node.body1 &&
          doc.node.body1
            .filter(slice => !!slice.type)
            .map((slice, key) => (
              <Slice key={key} alternateLayout={!!(key & 1)} {...slice} />
            ))}
      </div>
    </Layout>
  )
}

export default Page

// export const query = graphql`
//   query PortfolioQuery($uid: String) {
//     prismic {
//       allPortfos(uid: $uid) {
//         edges {
//           node {
//             title
//             teaser
//             studio
//             site_link {
//               ... on PRISMIC__ExternalLink {
//                 url
//               }
//             }
//             excerpt
//             project_date
//             body1 {
//               __typename
//               ... on PRISMIC_PortfoBody1Big_image {
//                 type
//                 primary {
//                   image
//                   imageSharp {
//                     childImageSharp {
//                       fluid(maxWidth: 1220) {
//                         ...GatsbyImageSharpFluid_withWebp
//                       }
//                     }
//                   }
//                 }
//               }
//               ... on PRISMIC_PortfoBody1Pullquote {
//                 type
//                 primary {
//                   pullquote
//                 }
//               }
//               ... on PRISMIC_PortfoBody1Content_block {
//                 type
//                 primary {
//                   body
//                   image
//                   imageSharp {
//                     childImageSharp {
//                       fluid(maxWidth: 560) {
//                         ...GatsbyImageSharpFluid_withWebp
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
