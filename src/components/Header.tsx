"use client"

import { FC, useLayoutEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { Container } from "./Container"
import { H1 } from "./Type"

const Header: FC = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={clsx(
        "mb-5 lg:mb-10 py-5 lg:py-10 fixed top-0 w-full z-10",
        open && "bg-bg dark:bg-bg-dark"
      )}
    >
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex-grow">
            <Link
              href="/"
              passHref
              className={clsx(
                H1.classNames,
                "underline mouse:hover:opacity-60"
              )}
            >
              Sam Haakman
            </Link>
          </div>
          <div className="cell">
            <div className="sm:hidden">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="mobile-menu-opener"
                aria-controls="main-nav"
                aria-haspopup="true"
                aria-expanded={open ? "true" : "false"}
              >
                <span className="sr-only">Open Mobile Menu</span>
              </button>
            </div>
            <nav
              className={clsx(
                "max-sm:fixed max-sm:top-16 left-0 bottom-0 max-sm:w-full",
                "max-sm:bg-bg max-sm:dark:bg-bg-dark",
                "max-sm:px-2.5",
                "max-sm:text-[1.375rem]",
                !open &&
                  "max-sm:opacity-0 max-sm:visibility-hidden max-sm:-left-full max-sm:right-full animation-none transition-nav",
                open && "max-sm:animate-fade-in"
              )}
              id="main-nav"
            >
              <ul
                className={clsx(
                  "flex flex-col sm:items-center sm:flex-row gap-2.5",
                  open && "animate-rise"
                )}
              >
                <li>
                  <Link
                    href="/portfolio"
                    passHref
                    className="py-4 block underline mouse:hover:opacity-60"
                  >
                    Portfolio
                  </Link>
                </li>
                <li className="max-sm:hidden" aria-hidden="true">
                  •
                </li>
                <li>
                  <Link
                    href="/about"
                    passHref
                    className="py-4 block underline mouse:hover:opacity-60"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
