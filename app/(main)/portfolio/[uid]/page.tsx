import BigImage from "@/components/BigImage"
import { Container } from "@/components/Container"
import ContentBlock from "@/components/ContentBlock"
import { PrismicRichText, PrismicText } from "@/components/Prismic"
import Pullquote from "@/components/Pullquote"
import { H1, H3 } from "@/components/Type"
import API from "@/utils/api"
import { Metadata } from "next"
import { notFound } from "next/navigation"

const getCaseStudy = async (uid: string) => {
  const { data } = await API.get({ q: `[[at(my.portfo.uid, "${uid}")]]` })

  return data.results.pop()
}

const Slice = ({ slice_type, ...props }) => {
  switch (slice_type) {
    case "big_image":
      return <BigImage image={props.primary.image} />
    case "content_block":
      return (
        <ContentBlock
          image={props.primary.image}
          alt={props.primary.image.alt}
          originalImage={props.primary.image}
          body={props.primary.body}
          alternateLayout={props.alternateLayout}
        />
      )
    case "pullquote":
      return <Pullquote pullquote={props.primary.pullquote} />
    default:
      return null
  }
}

export const revalidate = 60

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const cs = await getCaseStudy(params.uid)

  return {
    title: cs.data.title.pop().text,
  }
}

export default async function CaseStudy({ params }) {
  const cs = await getCaseStudy(params.uid)

  if (!cs) {
    notFound()
  }

  return (
    <Container>
      <style>
        {`:root {
          --bg-color-main: #fff;
          --fg-color: #000;
          --bg-image-main: none;
        }`}
      </style>
      {/* <pre>{JSON.stringify(cs, null, 2)}</pre> */}
      <div className="grid gap-7 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <H1 className="mb-10">
            <PrismicText field={cs.data?.title} />
          </H1>
          {cs?.data?.teaser && (
            <H3 as="h2" className="mb-10">
              <PrismicText field={cs.data.teaser} />
            </H3>
          )}
          <div>
            <PrismicText field={cs.data.studio} />•
            {Intl.DateTimeFormat("en-GB", {
              month: "long",
              year: "numeric",
            }).format(new Date(cs.data.project_date))}
          </div>
        </div>
        <div className="lg:col-span-3 lg:col-end-7">
          <PrismicRichText field={cs.data.excerpt} />
          <a
            href={cs.data.site_link.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="underline"
          >
            {cs.data.site_link.url
              .replace("http://", "")
              .replace("https://", "")}
          </a>
        </div>
      </div>
      <div>
        {cs.data.body1 &&
          cs.data.body1
            .filter((slice) => !!slice.slice_type)
            .map((slice, key) => (
              <Slice key={slice.id} alternateLayout={!!(key % 2)} {...slice} />
            ))}
      </div>
    </Container>
  )
}
