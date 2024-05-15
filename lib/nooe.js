// self
import { LIMIT } from "../constants.js"

export default async function fetchCharity(name) {
  const now = Date.now()
  const res = await fetch(`https://api.nooe.org/api/organizations?search_terms=${name}&limit=${LIMIT}`)
  const data = await res.json()
  const elapsed = Date.now() - now
  if (!data || !data.entries || !data.entries[0] || !data.entries[0].registration_number) {
    console.error("Nooe: not found.")
    return
  }
  return {
    elapsed,
    id: data.entries[0].registration_number.replaceAll(" ", ""),
    data
  }
}
