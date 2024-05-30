// self
import { CHARITABLEIMPACT_BASE, LIMIT } from "../constants.js"

export default async function fetchCharity(name) {
  const now = Date.now()
  const res = await fetch(new URL(`search/v2/public/autocomplete/charities-groups?query=${name}&page[size]=${LIMIT}`, CHARITABLEIMPACT_BASE))
  const json = await res.json()
  const res3 = await fetch(new URL(`beneficiary/v1/beneficiaries/find_by_slug?&load_full_profile=true&slug=${json.data[0].attributes.slug}`, CHARITABLEIMPACT_BASE))
  if (!res3.ok) return
  const data = await res3.json()
  const elapsed = Date.now() - now
  return {
    elapsed,
    id: data.data.attributes.businessNumber,
    data
  }
}
