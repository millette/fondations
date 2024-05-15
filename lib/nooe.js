// self
import { LIMIT } from "../constants.js"

// JACQUES-DE CHAMPLAIN
// https://app.nooe.org/donner/1cb01fb6-c8a0-4df0-972c-62e218777932
// https://app.nooe.org/
// https://app.nooe.org/donner?keywords=jacques-de%20champlain

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
