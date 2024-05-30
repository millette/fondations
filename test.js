// node
import assert from 'node:assert'
import test from "node:test"

// self
import { fetchAll, benevity, canadaHelps, nooe, mycharityfund, charitableimpact } from "./index.js"

const fondations = {
  "Fondation Jacques-de Champlain": "843634064RR0001",
  "Fondation Jacques-De Champlain": "843634064RR0001",
  "jacques de champlain": "843634064RR0001",
  "jacques-de champlain": "843634064RR0001",
  "scouts montérégie": "890144330RR0001",
}

const reverse = (s) => s.split("").reverse().join("")

test("benevity", { only: false}, async (t) => {
  await t.test("ok", async() => {
    const search = "Fondation Jacques-de Champlain"
    const results = await benevity(search)
    assert.strictEqual(results.id, fondations[search])
    assert.strictEqual(results.data.name, search)
  })

  await t.test("ok2", { only: false}, async() => {
    const search = "jacques de champlain"
    const results = await benevity(search)
    assert.strictEqual(results.id, fondations[search])
  })

  await t.test("ok3", { only: true}, async() => {
    const search = "scouts montérégie"
    const results = await benevity(search)
    assert.strictEqual(results.id, fondations[search])
  })

  await t.test("404", { only: false}, async () => {
    const results = await benevity(reverse("Fondation Jacques-de Champlain"))
    assert.strictEqual(results, undefined)
  })
})

test("canadaHelps", { only: false}, async (t) => {
  await t.test("ok", { only: false}, async() => {
    const search = "Fondation Jacques-de Champlain"
    const results = await canadaHelps(search)
    assert.strictEqual(results.id, fondations[search])
    assert.strictEqual(results.results[0].data.businessName, search)
  })

  await t.test("ok2", { only: false}, async() => {
    const search = "jacques de champlain"
    const results = await canadaHelps(search)
    assert.strictEqual(results.id, fondations[search])
  })

  await t.test("ok3", { only: true}, async() => {
    const search = "scouts montérégie"
    const results = await canadaHelps(search)
    assert.strictEqual(results.id, fondations[search])
  })

  await t.test("404", { only: false}, async () => {
    const results = await canadaHelps(reverse("Fondation Jacques-de Champlain"))
    assert.strictEqual(results, undefined)
  })
})

test("nooe", { only: false}, async (t) => {
  await t.test("ok", { only: false}, async() => {
    const search = "Fondation Jacques-De Champlain"
    const results = await nooe(search)
    assert.strictEqual(results.id, fondations[search])
    assert.strictEqual(results.data.entries[0].name, search)
  })

  await t.test("ok2", { only: false}, async() => {
    const search = "jacques de champlain"
    const results = await nooe(search)
    assert.strictEqual(results.id, fondations[search])
  })

  await t.test("ok3", { only: true}, async() => {
    const search = "scouts montérégie"
    const results = await nooe(search)
    assert.strictEqual(results.id, fondations[search])
  })

  await t.test("404", { only: false}, async () => {
    const results = await nooe(reverse("Fondation Jacques-De Champlain"))
    assert.strictEqual(results, undefined)
  })
})

test("mycharityfund", { only: false}, async (t) => {
  await t.test("ok", { only: false}, async() => {
    const search = "Fondation Jacques-De Champlain"
    const results = await mycharityfund(search)
    assert.strictEqual(results.id, fondations[search])
    assert.strictEqual(results.data.data.name, search)
  })

  await t.test("ok2", { only: false}, async() => {
    const search = "jacques-de champlain"
    const results = await mycharityfund(search)
    assert.strictEqual(results.id, fondations[search])
  })

  await t.test("ok3", { only: false}, async() => {
    const search = "jacques de champlain"
    const results = await mycharityfund(search)
    assert.strictEqual(results?.id, fondations[search])
  })

  await t.test("ok4", { only: true}, async() => {
    const search = "scouts montérégie"
    const results = await mycharityfund(search)
    assert.strictEqual(results?.id, fondations[search])
  })

  await t.test("404", { only: false}, async () => {
    const results = await mycharityfund(reverse("Fondation Jacques-De Champlain"))
    assert.strictEqual(results, undefined)
  })
})

test("charitableimpact", { only: true}, async (t) => {
  await t.test("ok", { only: false}, async() => {
    const search = "Fondation Jacques-De Champlain"
    const results = await charitableimpact(search)
    assert.strictEqual(results.id, fondations[search])
    assert.strictEqual(results.data.data.attributes.name, search)
  })

  await t.test("ok2", { only: false}, async() => {
    const search = "jacques de champlain"
    const results = await charitableimpact(search)
    assert.strictEqual(results.id, fondations[search])
  })

  await t.test("ok3", { only: true}, async() => {
    const search = "scouts montérégie"
    const results = await charitableimpact(search)
    assert.strictEqual(results.id, "140892670RR0001") //  fondations[search]
  })

  await t.test("404", { only: false}, async () => {
    const results = await charitableimpact(reverse("Fondation Jacques-De Champlain"))
    assert.strictEqual(results, undefined)
  })
})
