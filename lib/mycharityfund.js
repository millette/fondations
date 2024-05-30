// npm
import transliterate from "@sindresorhus/transliterate"
import fuzzysort from "fuzzysort"

// self
import { MYCHARITYFUND_BASE } from "../constants.js"
import processFile from "./mycharityfund-process.js"

let searcher

function prepareSearch(data, options) {
  if (options) {
    if (!options.threshold) options.threshold = 0.5
    if (!options.limit) options.limit = 5
  } else {
    options = { threshold: 0.5, limit: 5 }
  }

  const names = new Map(data)
  const keys = [...names.keys()].map(fuzzysort.prepare)
  return (s) => fuzzysort.go(transliterate(s).toLocaleLowerCase(), keys, options).map(({target}) => names.get(target))
}

export default async function fetchCharity(name2, options) {
  const now = Date.now()
  name2 = transliterate(name2).toLowerCase()
  const cnt = await processFile(options)
  if (!searcher) searcher = prepareSearch(cnt.json, options)

  const [it] = searcher(name2)
  if (!it?.id) return

  const res2 = await fetch(new URL(`charity/${it.id}`, MYCHARITYFUND_BASE))
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
