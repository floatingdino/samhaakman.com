import Link from "next/link"
import Image from "next/image"
import { PrismicText } from "@prismicio/react"
import { FC } from "react"

type BigCardProps = {
  case_study
  index: number
}
export const BigCard: FC<BigCardProps> = ({ case_study, index }) => {
  return (
    <article className="card mb-2" key={case_study.document.uid}>
      <div className="grid-x align-justify">
        <div className="cell large-4 small-8 grid-y">
          <div className="cell auto grid-y align-center">
            <h2 className="h1 mt-0 mb-1">
              <PrismicText field={case_study.teaser || case_study.title} />
            </h2>
            <Link
              href={`/portfolio/${case_study.document.uid}`}
              className="arrow-link"
              passHref
            >
              {case_study.teaser ? (
                <PrismicText field={case_study.title} />
              ) : (
                "Read More"
              )}
            </Link>
          </div>
          <div className="cell shrink meta mt-1">
            <PrismicText field={case_study.studio} /> •{" "}
            <time>
              {Intl.DateTimeFormat("en-GB", {
                month: "long",
                year: "numeric",
              }).format(case_study.project_date)}
            </time>
          </div>
        </div>
        <div className="cell large-6">
          <Image
            src={case_study.preview_image}
            alt=""
            // alt={case_study}
            className="large-card-image"
            priority={index === 0}
            // sizes="(min-width: 1300px) 650px, (min-width: 64em) 50vw, 100vw"
          />
        </div>
      </div>
    </article>
  )
}
export default BigCard
