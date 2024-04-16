import { Container } from "@/components/Container"
import { PrismicRichText, PrismicText } from "@/components/Prismic"
import { H1 } from "@/components/Type"
import API from "@/utils/api"
import { Metadata } from "next"
import { notFound } from "next/navigation"

const getPage = async (uid: string) => {
  const { data } = await API.get({ q: `[[at(my.page.uid, "${uid}")]]` })

  return data.results.pop()
}

export const runtime = "edge"
export const revalidate = 60

export async function generateMetadata({ params }): Promise<Metadata> {
  try {
    const page = await getPage(params.uid)
    return {
      title: page.data.page_title.pop().text,
    }
  } catch (e) {
    return null
  }
}
export default async function Page({ params }) {
  const page = await getPage(params.uid)

  if (!page) {
    notFound()
  }
  return (
    <Container className="mb-20">
      <style>
        {`:root {
          --bg-color-main: #fff;
          --fg-color: #000;
          --bg-image-main: none;
        }`}
      </style>
      <div className="lg:w-1/2 mx-auto">
        <H1 className="mb-10">
          <PrismicText field={page.data.page_title} />
        </H1>
        <PrismicRichText field={page.data.body} />
      </div>
    </Container>
  )
}
