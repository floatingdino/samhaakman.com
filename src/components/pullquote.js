import React from "react"
import { RichText } from "prismic-reactjs"

import "./pullquote.scss"

const Pullquote = ({ pullquote, ...props }) => (
  <div className="portfolio-slice portfolio-slice-pullquote mt-4 mb-4">
    <div className="grid-x grid-margin-x align-center text-center">
      <div className="cell large-7">
        <blockquote className="h1">{RichText.asText(pullquote)} </blockquote>
      </div>
    </div>
  </div>
)

export default Pullquote
