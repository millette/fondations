// npm
import { loadJsonFile } from "load-json-file"
// import { writeJsonFile } from "write-json-file"
// import dl from 'damerau-levenshtein'
import ll from 'damerau-levenshtein'

console.log(ll)
const x = ll("aa", "bb")
console.log(x)
// process.exit()
// const levenshtein = ll.default

// self
import { MYCHARITYFUND_FILENAME } from "./constants.js"

// const dl = new DamerauLevenshtein()

const score = (a, b) => {
  let s = (a.split(" ").length / b.split(" ").length)
  s = (s < 1) ? s : 1 / s
  return s * Math.log10((a + b).length)
}

const { json } = await loadJsonFile(MYCHARITYFUND_FILENAME)

const keys = json.map(([key]) => key)



const splitted = new Map()

keys.forEach((n) => {
  const x = n.split("/").map((y) => y.trim()).filter(Boolean)
  const s = (x.length === 2) && score(x[0], x[1])
  const d = (x.length === 2) && ll(x[0], x[1])
  console.log(n, d)
  return {s, d, n: x.length, l: n.split(" ").length}
  // if (s && (s <= 1)) splitted.set(n, { s, n: x.length, l: n.split(" ").length })
  // splitted.set(n, { s, n: x.length, l: n.split(" ").length })
  // if (s && (s < 0.57 || s > 1.75)) splitted.set(n, { s, n: x.length, l: n.split(" ").length })
})

console.log(JSON.stringify([...splitted], null, 2))
