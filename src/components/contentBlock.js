import React from "react"
import { RichText } from "prismic-reactjs"

import Image from "./image"

const ContentBlock = ({ body, image, originalImage, alt, ...props }) => (
  <div className="portfolio-slice portfolio-slice-content-block mt-4 mb-4">
    <div className="grid-x grid-margin-x align-middle">
      <div
        className="cell large-6"
        style={{ order: (props.alternateLayout && "1") || null }}
      >
        <RichText render={body} />
      </div>
      <div className="cell large-6">
        <Image
          sharp={image}
          image={{ ...originalImage, alt: alt }}
          className="mt-2 mb-2"
        />
      </div>
    </div>
  </div>
)

export default ContentBlock
