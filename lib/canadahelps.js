// npm
import { parseEntities } from 'parse-entities'

// JACQUES-DE CHAMPLAIN
// https://www.canadahelps.org/fr/
// https://www.canadahelps.org/fr/organismesdebienfaisance/fondation-jacques-de-champlain/

export default async function fetchCharity(name) {
  const now = Date.now()
  const res = await fetch(`https://www.canadahelps.org/site/api/charity-search/get-results?limit=1&offset=0&q=${name}`)
  const json = await res.json()
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
