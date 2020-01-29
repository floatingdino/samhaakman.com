import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./header.scss"

const Header = ({ siteTitle }) => (
  <header className="mb-2">
    <div className="grid-container">
      <div className="grid-x align-justify align-middle">
        <div className="cell auto">
          <div className="header-logo">
            <Link to="/">{siteTitle}</Link>
          </div>
        </div>
        <div className="cell shrink">
          <nav className="show-for-large">
            <ul className="header-nav">
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
              <li>About</li>
            </ul>
          </nav>
          <div className="hide-for-large">MENU</div>
        </div>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
