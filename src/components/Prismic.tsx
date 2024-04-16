"use client"

import {
  PrismicRichText as OPrismicRichText,
  PrismicText,
} from "@prismicio/react"
import { H1, H2, H3 } from "./Type"

const COMPONENTS = {
  heading1: ({ children }) => <H1 className="mb-10">{children}</H1>,
  heading2: ({ children }) => <H2 className="mb-10">{children}</H2>,
  heading3: ({ children }) => <H3 className="mb-[1em]">{children}</H3>,
  paragraph: ({ children }) => <p className="mb-9">{children}</p>,
  hyperlink: ({ children, node: { data } }) => (
    <a href={data.url} className="underline" target={data.target}>
      {children}
    </a>
  ),
}

const PrismicRichText: typeof OPrismicRichText = (props) => {
  return <OPrismicRichText components={COMPONENTS} {...props} />
}

export { PrismicText, PrismicRichText }
