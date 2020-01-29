import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./header.scss"

const Header = ({ siteTitle }) => (
  <header>
    <div className="grid-container">
      <div class="grid-x align-justify align-middle">
        <div class="cell auto">
          <div class="header-logo">
            <Link to="/">{siteTitle}</Link>
          </div>
        </div>
        <div class="cell shrink">
          <div class="show-for-large">Main Nav goes here</div>
          <div class="hide-for-large">MENU</div>
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
