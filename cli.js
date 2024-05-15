// node
import meow from "meow"

// self
import { fetchAll } from "./index.js"

const cli = meow(`
  Usage
    $ foo <input>

  Options
    --rainbow, -r  Include a rainbow

  Examples
    $ foo unicorns --rainbow
    🌈 unicorns 🌈
  `, {
  importMeta: import.meta,
})

const [benevity, canadaHelps, nooe, mycharityfund, charitableimpact] = await fetchAll(cli.input[0])
console.log(JSON.stringify({ benevity, canadaHelps, nooe, mycharityfund, charitableimpact }, null, 2))
