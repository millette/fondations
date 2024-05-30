// core
import { unlink } from "node:fs/promises"

// npm
import { loadJsonFile } from "load-json-file"
import { writeJsonFile } from "write-json-file"
import transliterate from "@sindresorhus/transliterate"

// self
import { MYCHARITYFUND_BASE, MYCHARITYFUND_FILENAME, MYCHARITYFUND_ORIG_FILENAME } from "../constants.js"

/*
const exceptions = [
  '2/3',
  'st-michel/femmes-relais',
  '1956/86',
  'squadron/escadron',
  'aaia allergy/asthma',
  'abbey-lancer/portreeve',
  'al-anon/alateen ',
  'elgin / st thomas',
  'amis du/friends',
  'hills/ kinistino',
  'apohaqui/norton/kings',
  'a.r.h.s./e.b.',
  'armstrong/spallumcheen',
  'canada/dance',
  'intellectuelles/becancour',
  'mauricie/centre',
  'rive-sud/iles',
  'foodbank/crisis',
  'avonlea/blue',
  'avon/putnam',
  'avon view / west',
  'big brothers/big sisters',
  'big brothers/ big sisters',
  'nha/nhl',
  'bleecker/wellesley',
  'bluteau/devenney',
  '14/19',
  'bmmf/international',
  'boissevain/morton',
  'Accord / Gibbons',
  'boston bar/north',
  '',
  '',
  '',
  '',
  '',
  '',
]
*/

export default async function processFile(options) {
  let cnt
  try {
    if (options?.refresh) await unlink(MYCHARITYFUND_FILENAME)
    cnt = await loadJsonFile(MYCHARITYFUND_FILENAME)
    // TODO: check if file is not too old
  } catch(e) {
    if (e.code !== "ENOENT") throw e
    const res = await fetch(new URL("charities/all", MYCHARITYFUND_BASE))
    const json = await res.json()
    await writeJsonFile(MYCHARITYFUND_ORIG_FILENAME, json, { indent: false })
    const names = new Map(
    [...json.map(({ id, name }, i) => ([`${transliterate(name).toLocaleLowerCase().trim()} (${i})`, { id, name }]))])
    cnt = { now: Date.now(), json: [...names] }
    await writeJsonFile(MYCHARITYFUND_FILENAME, cnt, { indent: false })
  } finally {
    return cnt
  }
}
