// core
import { unlink } from "node:fs/promises"

// npm
import { loadJsonFile } from "load-json-file"
import { writeJsonFile } from "write-json-file"
import transliterate from "@sindresorhus/transliterate"
import fuzzysort from "fuzzysort"

// self
import { MYCHARITYFUND_BASE, MYCHARITYFUND_FILENAME, MYCHARITYFUND_ORIG_FILENAME } from "../constants.js"

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
  // console.log("NAME2", name2)
  // let cntOrig
  let cnt
  try {
    if (options?.refresh) await unlink(MYCHARITYFUND_FILENAME)
    cnt = await loadJsonFile(MYCHARITYFUND_FILENAME)
    // TODO: check if file exists and not too old
  } catch (e) {
    if (e.code !== "ENOENT") throw e
    const res = await fetch(new URL("charities/all", MYCHARITYFUND_BASE))
    const json = await res.json()
    // cntOrig = { now: Date.now(), json }
    await writeJsonFile(MYCHARITYFUND_ORIG_FILENAME, json, { indent: false })
    cnt = {
      now: Date.now(),
      json: json.map(({ id, name }) => [transliterate(name).toLocaleLowerCase(), { name, id }]),
    }
    if (!searcher) searcher = prepareSearch(cnt.json)
    await writeJsonFile(MYCHARITYFUND_FILENAME, cnt, { indent: false })
  } finally {
    if (!searcher) searcher = prepareSearch(cnt.json)
      /*
    const it2 = cntOrig.json.find(({ name }) => transliterate(name).toLowerCase().includes(name2))
    console.log("IT2", it2)
    */

    const [it] = searcher(name2)
    // console.log("IT", it)
    if (!it?.id) return

    const res2 = await fetch(new URL(`charity/${it.id}`, MYCHARITYFUND_BASE)) // 55289
    // NOTE: "cra_description" encoding error
    // "cra_description": "Favoriser l'acc?s ? la d?fibrillation en r?gion                            Recherche cardiovasculaire",
    const data = await res2.json()
    // console.log("DATA", JSON.stringify(data, null, 2))
    const elapsed = Date.now() - now
    return {
      elapsed,
      id: data.data.charity_number,
      data
    }
  }
}
