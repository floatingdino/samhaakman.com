import React from "react"
import Image from "./image"

const BigImage = ({ image, originalImage, alt }) => (
  <div className="portfolio-slice portfolio-slice-big-image mt-4 mb-4">
    <Image sharp={image} image={{ ...originalImage, alt: alt }} />
  </div>
)

export default BigImage
