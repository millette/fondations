// self
import { fetchAll } from "./index.js"

const [benevity, canadaHelps, nooe, mycharityfund, charitableimpact] = await fetchAll("Jacques de Champlain")
console.log(JSON.stringify({ benevity, canadaHelps, nooe, mycharityfund, charitableimpact }, null, 2))
