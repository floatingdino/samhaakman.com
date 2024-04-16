import React from "react"
import Image from "next/image"

const BigImage = ({ image }) => (
  <div className="portfolio-slice portfolio-slice-big-image my-20">
    <Image
      src={image.url}
      alt={image.alt}
      width="1244"
      height="700"
      style={{ height: "auto" }}
    />
  </div>
)

export default BigImage
