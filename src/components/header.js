import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import "./header.scss"

const Header = ({ siteTitle }) => {
  const [open, setOpen] = useState(false)
  return (
    <header className="mb-2">
      <div className="grid-container">
        <div className="grid-x align-justify align-middle">
          <div className="cell auto">
            <div className="header-logo">
              <Link to="/">{siteTitle}</Link>
            </div>
          </div>
          <div className="cell shrink">
            <div className="hide-for-large">
              <button
                onClick={() => setOpen(!open)}
                className="mobile-menu-opener"
                aria-controls="main-nav"
                aria-haspopup="true"
                aria-expanded={open ? "true" : "false"}
              >
                <span class="show-for-sr">Open Mobile Menu</span>
              </button>
            </div>
            <nav
              className={`main-nav ${(!open && "hidden") || ""}`}
              id="main-nav"
            >
              <ul className="header-nav">
                <li>
                  <Link to="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
