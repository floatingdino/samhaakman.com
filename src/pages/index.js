import React from "react"
import { graphql, Link } from "gatsby"
import { RichText, Date } from "prismic-reactjs"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"

import "../styles/styles.scss"
import "./index.scss"

const IndexPage = ({ data }) => {
  const doc = data.allPrismicHomepage.nodes.slice(0, 1).pop()
  const articles = doc.data.featured_case_studies
  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="mt-0">
        {(doc && RichText.asText(doc.data.title.raw)) ||
          "I'm Sam! Welcome to my website"}
      </h1>
      {doc && RichText.render(doc.data.body.raw)}
      <div className="article-wrapper">
        {articles &&
          articles.map((article, idx) => {
            const case_study = article.case_study.document.data
            return (
              <article
                className="card mb-2"
                key={article.case_study.document.uid}
              >
                <div className="grid-x align-justify">
                  <div className="cell large-4 small-8 grid-y">
                    <div className="cell auto grid-y align-center">
                      <h2 className="h1 mt-0 mb-1">
                        {RichText.asText(
                          case_study.teaser.raw || case_study.title.raw
                        )}
                      </h2>
                      <Link
                        to={`/portfolio/${article.case_study.document.uid}`}
                        className="arrow-link"
                      >
                        {(case_study.teaser &&
                          RichText.asText(case_study.title.raw)) ||
                          "Read More"}
                      </Link>
                    </div>
                    <div className="cell shrink meta mt-1">
                      {RichText.asText(case_study.studio.raw)}{" "}
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
                      image={case_study.preview_image}
                      loading={idx === 0 ? "eager" : "lazy"}
                      className="large-card-image"
                      // sizes="(min-width: 1300px) 650px, (min-width: 64em) 50vw, 100vw"
                    />
                  </div>
                </div>
              </article>
            )
          })}
      </div>
      <Link to="/portfolio">
        + {data.allPrismicPortfo.totalCount - articles.length} more projects on
        my portfolio page
      </Link>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allPrismicHomepage(limit: 1) {
      nodes {
        data {
          title {
            raw
          }
          body {
            raw
          }
          featured_case_studies {
            case_study {
              document {
                ... on PrismicPortfo {
                  uid
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
                    project_date
                    preview_image {
                      fluid(maxHeight: 560, maxWidth: 650) {
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
    }
    allPrismicPortfo {
      totalCount
    }
  }
`
