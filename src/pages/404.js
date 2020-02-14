import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>That's a 404, my friend</h1>
    <p>Nothing doing here, move along.</p>
    <img
      src="https://thumbs.gfycat.com/BronzeDizzyGrasshopper-size_restricted.gif"
      alt="not the droids you're looking for"
    />
  </Layout>
)

export default NotFoundPage
