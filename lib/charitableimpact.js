// self
import { LIMIT } from "../constants.js"

// JACQUES-DE CHAMPLAIN
// https://www.charitableimpact.com/
// https://my.charitableimpact.com/charities/fondation-jacques-de-champlain

export default async function fetchCharity(name) {
  const now = Date.now()
  const res = await fetch(`https://api.charitableimpact.com/search/v2/public/autocomplete/charities-groups?query=${name}&page[size]=${LIMIT}`)
  const json = await res.json()

  const res3 = await fetch(`https://api.charitableimpact.com/beneficiary/v1/beneficiaries/find_by_slug?&load_full_profile=true&slug=${json.data[0].attributes.slug}`)
  const data = await res3.json()
  const elapsed = Date.now() - now
  return {
    elapsed,
    id: data.data.attributes.businessNumber,
    data
  }
}
