import type { RequestInit } from "next/dist/server/web/spec-extension/request"
import ErrorWithData from "./ErrorWithData"

export const AUTH_COOKIE_PATH = "Authorization"
export const MASQUERADE_TYPE_COOKIE_PATH = "MasqueradeType"
export const MASQUERADE_SLUG_COOKIE_PATH = "MasqueradeSlug"

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

type Message = Record<string, any>

async function processResponse<T = Message>(r: Response) {
  const response = r

  let data: Message | string | null = null
  try {
    data = await r.text()
    data = JSON.parse(data)
  } catch (e) {
    console.warn("bad JSON response", e)
  }
  if (!response.ok) {
    throw new ErrorWithData(
      response?.statusText || "Unknown error",
      typeof data === "object"
        ? { ...(data as { [k: string]: any }), response, url: response.url }
        : { url: response.url, response }
    )
  }
  return {
    data,
    response,
  } as {
    data: T
    response: Response
  }
}

/**
 * Fetch and send data to / from your main data provider / CMS
 * Provides a simple mechanism for using different APIs for different environments
 */
export const API = {
  async get<T = Message>(
    predicates: Record<string, string>,
    options: RequestInit = {}
  ) {
    const ref = await this.getRef()
    const params = new URLSearchParams({
      ref,
      ...predicates,
    })
    return fetch(
      new URL(`/api/v2/documents/search?${params}`, API_URL),
      options
    ).then<ReturnType<typeof processResponse<T>>>(processResponse)
  },
  async getRef() {
    const { data } = await fetch(new URL("/api/v2", API_URL)).then(
      processResponse
    )
    const [{ ref }] = data.refs
    return ref
  },
}

export default API
