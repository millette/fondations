// npm
import { loadJsonFile } from "load-json-file"
// import { writeJsonFile } from "write-json-file"

// self
import { MYCHARITYFUND_FILENAME } from "./constants.js"

const { json } = await loadJsonFile(MYCHARITYFUND_FILENAME)

const keys = json.map(([key]) => key)

const keysSet = new Set([...keys])
console.log("nKeys:", keys.length, keysSet.size)

function lengthSorter(a, b) {
  const la = a.length
  const lb = b.length
  if (!la) console.log("AAA", a)
  if (la > lb) return 1
  if (la < lb) return -1
}

const keysByLength = keys.sort(lengthSorter)

console.log(keysByLength[0])
console.log(keysByLength[keysByLength.length - 1])