/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Header from "./Header"

import "./layout.scss"

const Layout = ({ children, className }) => {
  return (
    <div className={`layout-wrapper ${className || ""}`}>
      <Header siteTitle="Sam Haakman" />

      <main>
        <div className="grid-container">{children}</div>
      </main>
      <footer className="mt-2 pb-2">
        <div className="grid-container">
          <div className="grid-x grid-margin-x">
            <div className="cell auto">
              <a
                href="https://github.com/floatingdino"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>{" "}
              <span className="separator" />{" "}
              <a href="mailto:sam@samhaakman.com">Email</a>
            </div>
            <div className="cell shrink">
              <Link to="/privacy">Privacy Policy</Link>
            </div>
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
