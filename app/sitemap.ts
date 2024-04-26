import API from "@/utils/api"
import { MetadataRoute } from "next"

const STATIC_ROUTES = ["", "/portfolio"]
const CANONICAL_DOMAIN = "https://samhaakman.com"

export const runtime = "edge"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: pages }, { data: portfolio }] = await Promise.all([
    API.get({ q: '[[at(document.type, "page")]]' }),
    API.get({ q: '[[at(document.type, "portfo")]]' }),
  ])

  const pageRoutes = pages.results.map((page) => ({
    url: new URL(`/${page.uid}`, CANONICAL_DOMAIN).toString(),
    lastmod: page.last_publication_date,
  }))

  const portfolioRoutes = portfolio.results.map((caseStudy) => ({
    url: new URL(`/portfolio/${caseStudy.uid}`, CANONICAL_DOMAIN).toString(),
    lastmod: caseStudy.last_publication_date,
  }))

  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: new URL(route, CANONICAL_DOMAIN).toString(),
  }))

  return [...staticRoutes, ...pageRoutes, ...portfolioRoutes]
}
