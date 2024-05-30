// npm
import { parseEntities } from 'parse-entities'

// self
import { CANADAHELPS_BASE, LIMIT } from "../constants.js"

export default async function fetchCharity(name) {
  const now = Date.now()
  const res = await fetch(new URL(`get-results?limit=${LIMIT}&offset=0&q=${name}`, CANADAHELPS_BASE))

  if (!res.ok) return
  const json = await res.json()
  if (!json?.results?.length) return

  const elapsed = Date.now() - now
  return {
    elapsed,
    id: json.results[0].businessNumber,
    ...json,
    results: json.results.map((x) => ({
      data: {
        ...x,
        aboutEn: parseEntities(x.aboutEn),
        aboutFr: parseEntities(x.aboutFr)
      }
    }))
  }
}
