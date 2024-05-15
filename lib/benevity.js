// npm
import { fromHtml } from 'hast-util-from-html'
import { select, selectAll } from 'hast-util-select'
import { toText } from 'hast-util-to-text'

function getHref(fc) {
  const h = fromHtml(fc)
  const s = select('a.c-causes-cause-preview-info__see-details', h)
  if (!s?.properties?.href) throw new Error("Not found.")
  return new URL(s.properties.href, 'https://causes.benevity.org')
}

function getInfo(now, fc) {
  const stuff = selectAll('address', fromHtml(fc))
  const name = select('strong', stuff[0]).children[0].value
  const address = selectAll('div', stuff[0]).map((x) => x.children[0].type === 'text' && toText(x)).filter(Boolean).join('\n')
  const url = select('a', stuff[1])?.properties?.href
  if (!url) {
    console.error("Benevity: not found.")
    return
  }
  const id = toText(stuff[2].children[2])
  const elapsed = Date.now() - now
  return { elapsed, id, data: { name, address, url, id }}
}

export default async function fetchCharity(name) {
  const now = Date.now()
  const res = await fetch(`https://causes.benevity.org/causes/search/Canada/${name}`)
  const txt = await res.text()
  try {
    const res2 = await fetch(getHref(txt))
    const txt2 = await res2.text()
    return getInfo(now, txt2)
  } catch (e) {
    if (e.message !== "Not found.") throw e
    console.error("Benevity: not found.")
  }
}
