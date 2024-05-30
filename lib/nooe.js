// self
import { NOOE_BASE, LIMIT } from "../constants.js"

export default async function fetchCharity(name) {
  const now = Date.now()
  const res = await fetch(new URL(`organizations?search_terms=${name}&limit=${LIMIT}`, NOOE_BASE))
  const data = await res.json()
  const elapsed = Date.now() - now
  if (!data || !data.entries || !data.entries[0] || !data.entries[0].registration_number) {
    return
  }
  return {
    elapsed,
    id: data.entries[0].registration_number.replaceAll(" ", ""),
    data
  }
}
