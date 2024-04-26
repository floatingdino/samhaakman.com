import { PrismicRichText, PrismicText } from "@/components/Prismic"
import { H2 } from "@/components/Type"
import API from "@/utils/api"
import BigCard from "@/components/BigCard"
import { Container } from "@/components/Container"
import Link from "next/link"

const fetchHomeData = async () => {
  const [{ data: homepageData }, { data: caseStudies }] = await Promise.all([
    API.get({
      q: '[[at(document.type, "homepage")]]',
      fetchLinks:
        "portfo.teaser,portfo.title,portfo.studio,portfo.project_date,portfo.preview_image,portfo.preview_video",
      pageSize: "1",
    }),
    API.get({ q: '[[at(document.type, "portfo")]]', pageSize: "1" }),
  ])

  const [page] = homepageData.results
  return { page, totalCaseStudies: caseStudies.total_results_size }
}

export const metadata = {
  title: "Home",
}

export const revalidate = 60

export default async function HomePage() {
  const { page, totalCaseStudies } = await fetchHomeData()
  const articles = page?.data?.featured_case_studies
  return (
    <Container>
      <H2 as="h1" className="mb-10">
        <PrismicText field={page.data.title} />
      </H2>
      <div className="mb-10">
        <PrismicRichText field={page.data.body} />
      </div>
      {/* <pre>{JSON.stringify(caseStudies, null, 2)}</pre> */}
      <div className="lg:-mx-10">
        {articles?.map((article, index) => (
          <BigCard
            key={article.case_study.uid}
            caseStudy={article.case_study}
            index={index}
          />
        ))}
      </div>
      <Link href="/portfolio" className="underline mouse:hover:opacity-60">
        + {totalCaseStudies - articles.length} more selected projects on my
        portfolio page
      </Link>
    </Container>
  )
}
