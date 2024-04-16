"use client"

import {
  PrismicRichText as OPrismicRichText,
  PrismicText,
} from "@prismicio/react"
import { H1, H2 } from "./Type"

const COMPONENTS = {
  heading1: ({ children }) => <H1>{children}</H1>,
  heading2: ({ children }) => <H2>{children}</H2>,
  paragraph: ({ children }) => <p className="mb-10">{children}</p>,
}

const PrismicRichText: typeof OPrismicRichText = (props) => {
  return <OPrismicRichText components={COMPONENTS} {...props} />
}

export { PrismicText, PrismicRichText }
