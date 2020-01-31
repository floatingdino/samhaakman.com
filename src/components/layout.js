/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"

import "./layout.scss"

const Layout = ({ children, className }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={`layout-wrapper ${className || ""}`}>
      <Header siteTitle={data.site.siteMetadata.title} />

      <main>
        <div className="grid-container">{children}</div>
      </main>
      <footer className="mt-2 pb-2">
        <div className="grid-container">
          <div>
            <a href="mailto:sam@samhaakman.com">sam@samhaakman.com</a>
          </div>
          <div>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
