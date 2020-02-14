import React from "react"
import { graphql, Link } from "gatsby"
import { RichText, Date } from "prismic-reactjs"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"

import { linkResolver } from "../utils/linkResolver"

import "../styles/styles.scss"
import "./index.scss"

const IndexPage = ({ data }) => {
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  const articles = doc.node.featured_case_studies
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
          articles.map(({ case_study }) => (
            <article className="card mb-2" key={case_study._meta.uid}>
              <div className="grid-x align-justify">
                <div className="cell large-4 small-8 grid-y">
                  <div className="cell auto grid-y align-center">
                    <h2 className="h1 mt-0 mb-1">
                      {RichText.asText(case_study.teaser || case_study.title)}
                    </h2>
                    <Link
                      to={linkResolver(case_study._meta)}
                      className="arrow-link"
                    >
                      {(case_study.teaser &&
                        RichText.asText(case_study.title)) ||
                        "Read More"}
                    </Link>
                  </div>
                  <div className="cell shrink meta mt-1">
                    {RichText.asText(case_study.studio)}{" "}
                    <span className="separator" />{" "}
                    <time>
                      {Intl.DateTimeFormat("en-GB", {
                        month: "long",
                        year: "numeric",
                      }).format(Date(case_study.project_date))}
                    </time>
                  </div>
                </div>
                <div className="cell large-6">
                  <Image
                    sharp={case_study.preview_imageSharp}
                    image={case_study.preview_image}
                    className="large-card-image"
                  />
                </div>
              </div>
            </article>
          ))}
      </div>
      <Link to="/portfolio">
        + {data.prismic.allPortfos.totalCount - articles.length} more projects
        on my portfolio page
      </Link>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    prismic {
      allPortfos {
        totalCount
      }
      allHomepages(first: 1) {
        edges {
          node {
            title
            body
            featured_case_studies {
              case_study {
                _linkType
                ... on PRISMIC_Portfo {
                  title
                  teaser
                  studio
                  project_date
                  preview_image
                  preview_imageSharp {
                    childImageSharp {
                      fluid(maxHeight: 560) {
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
      }
    }
  }
`
