import { Container } from "@/components/Container"
import { H1 } from "@/components/Type"
import API from "@/utils/api"
import Link from "next/link"
import Image from "next/image"
import { PrismicText } from "@/components/Prismic"
import Card from "@/components/Card"

const fetchPortfolioData = async () => {
  const { data } = await API.get({
    q: '[[at(document.type, "portfo")]]',
    fetchLinks: "portfo.teaser,portfo.title,portfo.preview_image",
  })

  return data
}

export default async function Portfolio() {
  const caseStudies = await fetchPortfolioData()

  return (
    <Container>
      <H1 className="mb-10">
        Portfolio
        {caseStudies?.total_results_size && (
          <sup>({caseStudies.total_results_size})</sup>
        )}
      </H1>
      <div className="grid gap-7 lg:grid-cols-2">
        {caseStudies?.results.map((caseStudy) => (
          <Card className="flex flex-col overflow-hidden" key={caseStudy.uid}>
            <div className="grow">
              <H1 as="h2" className="mb-5">
                <PrismicText
                  field={caseStudy.data.teaser || caseStudy.data.title}
                />
              </H1>
            </div>
            <div className="mb-10">
              <Link href={`/portfolio/${caseStudy.uid}`} className="underline">
                {caseStudy.data.teaser && (
                  <PrismicText field={caseStudy.data.title} />
                )}
                {!caseStudy.data.teaser && "Read More"} →
              </Link>
            </div>
            <div className="-m-5 lg:-m-10 mt-0 lg:mt-0">
              <Image
                src={caseStudy.data.preview_image.url}
                alt={caseStudy.data.preview_image.alt || ""}
                className="small-card-image"
                width="608"
                height="523"
              />
            </div>
          </Card>
        ))}
      </div>
    </Container>
  )
}
