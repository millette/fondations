// core
import { unlink } from "node:fs/promises"

// npm
import { loadJsonFile } from "load-json-file"
import { writeJsonFile } from "write-json-file"
import transliterate from "@sindresorhus/transliterate"

// self
import { MYCHARITYFUND_BASE, MYCHARITYFUND_FILENAME, MYCHARITYFUND_ORIG_FILENAME } from "../constants.js"

export default async function processFile(options) {
  let cnt
  try {
    if (options?.refresh) await unlink(MYCHARITYFUND_FILENAME)
    cnt = await loadJsonFile(MYCHARITYFUND_FILENAME)
    // TODO: check if file is not too old
  } catch(e) {
    if (e.code !== "ENOENT") throw e
    const res = await fetch(new URL("charities/all", MYCHARITYFUND_BASE))
    const json = await res.json()
    await writeJsonFile(MYCHARITYFUND_ORIG_FILENAME, json, { indent: false })
    const names = new Map()
    json.forEach(({ id, name }) => {
      const t = transliterate(name).toLocaleLowerCase().trim()
      let r = names.get(t)
      if (r?.ids) r.ids.push(id)
      else r = { name, ids: [id] }
      names.set(t, r)
    })
    cnt = { now: Date.now(), json: [...names] }
    await writeJsonFile(MYCHARITYFUND_FILENAME, cnt, { indent: false })
  } finally {
    return cnt
  }
}
