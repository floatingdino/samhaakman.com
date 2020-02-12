import React from "react"
import Img from "gatsby-image"

const BigImage = ({ image, originalImage, alt }) => (
  <div className="portfolio-slice portfolio-slice-big-image mt-4 mb-4">
    {(image && image.childImageSharp && (
      <Img
        fluid={image.childImageSharp.fluid}
        alt={alt}
        style={{ display: "block" }}
      />
    )) || (
      <img src={originalImage.url} alt={alt} style={{ display: "block" }} />
    )}
  </div>
)

export default BigImage
