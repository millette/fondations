// npm
import { loadJsonFile } from "load-json-file"
import { writeJsonFile } from "write-json-file"

// JACQUES-DE CHAMPLAIN
// https://mycharityfund.ca/
// https://mycharityfund.ca/charity/55289/fondation-jacques-de-champlain

export default async function fetchCharity(name2) {
  const now = Date.now()
  name2 = name2.toLowerCase()
  let cnt
  try {
    cnt = await loadJsonFile("mycharityfund-all.json")
    // TODO: check if file exists and not too old
  } catch (e) {
    if (e.code !== "ENOENT") throw e
    const res = await fetch("https://mycharityfund.ca/api/website/charities/all")
    const json = await res.json()
    cnt = { now: Date.now(), json }
    await writeJsonFile("mycharityfund-all.json", cnt)
  } finally {
    const it = cnt.json.find(({ name }) => name.toLowerCase().includes(name2))
    if (!it?.id) {
      console.error("MyCharifyFund: not found.")
      return
    }
    const res2 = await fetch(`https://mycharityfund.ca/api/website/charity/${it.id}`) // 55289
    // NOTE: "cra_description" encoding error
    // "cra_description": "Favoriser l'acc?s ? la d?fibrillation en r?gion                            Recherche cardiovasculaire",
    const data = await res2.json()
    const elapsed = Date.now() - now
    return {
      elapsed,
      id: data.data.charity_number,
      data
    }
  }
}
