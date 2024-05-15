// npm
import { fromHtml } from 'hast-util-from-html'
import { select, selectAll } from 'hast-util-select'
import { toText } from 'hast-util-to-text'

// JACQUES-DE CHAMPLAIN
// https://benevity.com/causes
// https://causes.benevity.org/causes/124-843634064RR0001
// https://causes.benevity.org/causes

const getHref = (fc) => new URL(select('a.c-causes-cause-preview-info__see-details', fromHtml(fc)).properties.href, 'https://causes.benevity.org')

function getInfo(now, fc) {
  const stuff = selectAll('address', fromHtml(fc))
  const name = select('strong', stuff[0]).children[0].value
  const address = selectAll('div', stuff[0]).map((x) => x.children[0].type === 'text' && toText(x)).filter(Boolean).join('\n')
  const url = select('a', stuff[1]).properties.href
  const id = toText(stuff[2].children[2])
  const elapsed = Date.now() - now
  return { elapsed, id, data: { name, address, url, id }}
}

export default async function fetchCharity(name) {
  const now = Date.now()
  const res = await fetch(`https://causes.benevity.org/causes/search/--/${name}`)
  const txt = await res.text()
  const res2 = await fetch(getHref(txt))
  const txt2 = await res2.text()
  return getInfo(now, txt2)
}
