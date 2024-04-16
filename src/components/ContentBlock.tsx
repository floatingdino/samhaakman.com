import React from "react"

import Image from "next/image"
import { PrismicRichText } from "./Prismic"

const ContentBlock = ({ body, originalImage, alt, ...props }) => (
  <div className="portfolio-slice my-20">
    <div className="flex flex-wrap gap-7 items-center">
      <div
        className="lg:w-1/2"
        style={{ order: (props.alternateLayout && "1") || null }}
      >
        <PrismicRichText field={body} />
      </div>
      <div className="flex-1 shrink-0">
        <Image
          src={originalImage.url}
          alt={alt || originalImage.alt}
          className="mt-2 mb-2"
          width="606"
          height="606"
          style={{ height: "auto" }}
        />
      </div>
    </div>
  </div>
)

export default ContentBlock
