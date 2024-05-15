// self
import benevity from "./lib/benevity.js"
import canadaHelps from "./lib/canadahelps.js"
import nooe from "./lib/nooe.js"
import mycharityfund from "./lib/mycharityfund.js"
import charitableimpact from "./lib/charitableimpact.js"

const fetchAll = async (searchFor) => Promise.all([
  benevity(searchFor), // slow
  canadaHelps(searchFor), // 3rd fastest
  nooe(searchFor), // fast and complete
  mycharityfund(searchFor), // fastest
  charitableimpact(searchFor), // slow
])

export { fetchAll, benevity, canadaHelps, nooe, mycharityfund, charitableimpact }
