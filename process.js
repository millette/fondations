// self
import processFile from "./lib/mycharityfund-process.js"

const now = Date.now()
const { json } = await processFile()
console.log("Got", json.length, "entries in", Math.round((Date.now() - now) / 1000), "s")
