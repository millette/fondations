// self
import { fetchAll } from "./index.js"

const [a, b, c, d, e] = await fetchAll("Jacques de Champlain")
console.log(JSON.stringify({ a, b, c, d, e }, null, 2))
