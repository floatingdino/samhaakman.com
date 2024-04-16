import React from "react"
import { H1 } from "./Type"
import { PrismicText } from "./Prismic"

const Pullquote = ({ pullquote }) => (
  <div className="portfolio-slice my-20 px-5 py-10 lg:py-40 bg-bg-secondary dark:bg-bg-secondary-dark dark:text-fg-dark-secondary">
    <div className="text-center">
      <div className="lg:w-1/2 mx-auto">
        <H1 as="blockquote" className="text-pretty">
          <PrismicText field={pullquote} />
        </H1>
      </div>
    </div>
  </div>
)

export default Pullquote
