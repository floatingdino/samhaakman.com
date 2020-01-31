import React from "react"
import Img from "gatsby-image"

const BigImage = ({ image, alt }) => (
  <div className="portfolio-slice portfolio-slice-big-image mt-4 mb-4">
    <Img
      fixed={image.childImageSharp.fixed}
      alt={alt}
      style={{ display: "block" }}
    />
  </div>
)

export default BigImage
