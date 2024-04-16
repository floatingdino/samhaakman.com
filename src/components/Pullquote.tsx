import React from "react"
import { H1 } from "./Type"
import { PrismicRichText } from "./Prismic"
// import { RichText } from "prismic-reactjs"

// import "./pullquote.scss"

const Pullquote = ({ pullquote }) => (
  <div className="portfolio-slice my-20 py-10 lg:py-40 bg-bg-secondary dark:bg-fg-dark-secondary dark:text-fg-dark-secondary">
    <div className="text-center">
      <div className="lg:w-1/2 mx-auto">
        <H1 as="blockquote" className="text-pretty">
          <PrismicRichText field={pullquote} />
        </H1>
      </div>
    </div>
  </div>
)

export default Pullquote
