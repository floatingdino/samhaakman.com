import { Container } from "@/components/Container"
import { H1 } from "@/components/Type"

export const metadata = { title: "404: Not found" }

export default function NotFound() {
  return (
    <Container>
      <H1 className="mb-10">That&apos;s a 404, my friend</H1>
      <p className="mb-10">Nothing doing here, move along</p>
      <img
        src="https://media1.tenor.com/m/TlfAvuz0tLMAAAAC/obi-wan-kenobi-these-are-not-the-droids.gif"
        alt="not the droids you're looking for"
        className="w-full"
      />
    </Container>
  )
}
