import React from "react"
import Image from "./image"

const BigImage = ({ image }) => (
  <div className="portfolio-slice portfolio-slice-big-image mt-4 mb-4">
    <Image image={image} />
  </div>
)

export default BigImage
