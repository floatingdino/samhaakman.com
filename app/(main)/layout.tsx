import { Container } from "@/components/Container"
import Header from "@/components/Header"
import Link from "next/link"

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-44">{children}</main>
      <footer className="mt-10 pb-10">
        <Container>
          <div className="flex gap-2">
            <div className="grow flex gap-2">
              <a className="underline" href="//github.com/floatingdino">
                Github
              </a>
              •
              <a className="underline" href="mailto:sam@samhaakman.com">
                Email
              </a>
            </div>
            <div>
              <Link className="underline" href="/privacy">
                Privacy Policy
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}
