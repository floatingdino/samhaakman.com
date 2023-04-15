import type { RequestInit } from "next/dist/server/web/spec-extension/request"

export const AUTH_COOKIE_PATH = "Authorization"
export const MASQUERADE_TYPE_COOKIE_PATH = "MasqueradeType"
export const MASQUERADE_SLUG_COOKIE_PATH = "MasqueradeSlug"

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

type Message = Record<string, any>

type GenericHeaders = Record<string, string>

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
    throw response
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
  async get<T = Message>(predicates: Record<string,string>, options: RequestInit = {}) {
    const ref = await this.getRef()
    return fetch(new URL(`/api/v2/documents/search?${new URLSearchParams({ref, ...predicates})}`, API_URL), options).then<ReturnType<typeof processResponse<T>>>(processResponse)
  },
  async getRef() {
    const {data} = await fetch(new URL("/api/v2", API_URL)).then(processResponse)
    const [{ref}] = data.refs
    return ref
  }
}

export default API
