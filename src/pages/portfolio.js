import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/styles.scss"

const PortfolioPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Portfolio" />
      <h1>Portfolio</h1>
      <div class="grid-x grid-margin-x">
        <article class="cell large-6 card">
          <h2 class="mt-0">Portfolio Title</h2>
          <p>Link to Case Study</p>
        </article>
        <article class="cell large-6 card">
          <h2 class="mt-0">Portfolio Title</h2>
          <p>Link to Case Study</p>
        </article>
      </div>
    </Layout>
  )
}

export default PortfolioPage
