import { PrismicRichText, PrismicText } from "@prismicio/react"
import { H2 } from "@/components/Type"
import API from "@/utils/api"
import BigCard from "@/components/BigCard"

const fetchHomeData = async () => {
  const { data } = await API.get({
    q: '[[at(document.type, "homepage")]]',
    fetchLinks:
      "[portfo.teaser,portfo.title,portfo.studio,portfo.project_date,portfo.preview_image,portfo.preview_video]",
    pageSize: "1",
  })

  const [page] = data.results
  return page
}

export const metadata = {
  title: "Home",
}

export default async function HomePage() {
  const page = await fetchHomeData()
  const articles = page.featured_case_studies
  return (
    <>
      <pre>{JSON.stringify(page, null, 2)}</pre>
      <H2 as="h1">
        <PrismicText field={page.title} />
      </H2>
      {/* <PrismicRichText field={page.body} /> */}
      <div className="lg:-mx-10">
        {/* {articles.map((article, index) => (
          <BigCard portfo={article.case_study} index={index} />
        ))} */}
      </div>
    </>
  )
}
