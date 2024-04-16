"use client"

import Link from "next/link"
import Image from "next/image"
import { PrismicText } from "@/components/Prismic"
import { FC } from "react"
import { H1 } from "./Type"
import Card from "./Card"

type BigCardProps = {
  caseStudy
  index: number
}
export const BigCard: FC<BigCardProps> = ({ caseStudy, index }) => {
  return (
    <Card className="mb-10">
      <div className="flex flex-wrap justify-between">
        <div className="lg:w-1/3 w-2/3 flex flex-col">
          <div className="flex flex-col justify-center grow">
            <H1 as="h2" className="mb-1">
              <PrismicText
                field={caseStudy?.data?.teaser || caseStudy?.data?.title}
              />
            </H1>
            <Link href={`/portfolio/${caseStudy?.uid}`} className="underline">
              {caseStudy?.data?.teaser ? (
                <PrismicText field={caseStudy?.data?.title} />
              ) : (
                "Read More"
              )}{" "}
              →
            </Link>
          </div>
          <div className="cell shrink meta mt-1">
            <PrismicText field={caseStudy?.data?.studio} /> •{" "}
            <time className="inline-block">
              {Intl.DateTimeFormat("en-GB", {
                month: "long",
                year: "numeric",
              }).format(new Date(caseStudy?.data?.project_date))}
            </time>
          </div>
        </div>
        <div
          className="w-[calc(100%+2.5rem)] lg:w-1/2 relative -m-5 mt-0 lg:-m-10 lg:ml-0"
          style={{ aspectRatio: "5/4" }}
        >
          <Image
            src={caseStudy?.data?.preview_image?.url}
            alt={caseStudy?.data?.preview_image?.alt || ""}
            className="object-cover"
            priority={index === 0}
            fill
            // sizes="(min-width: 1300px) 650px, (min-width: 64em) 50vw, 100vw"
          />
        </div>
      </div>
    </Card>
  )
}
export default BigCard
