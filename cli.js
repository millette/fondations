// node
import meow from "meow"
import ora from "ora"

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

// console.log(cli)

if (!cli.input.length) {
  console.log(`${cli.pkg.name} v${cli.pkg.version}`)
  cli.showHelp()
}

const search = cli.input[0]

// TODO: use oraPromise() instead
const spinner = ora(`Searching for "${search}"`).start()

const [benevity, canadaHelps, nooe, mycharityfund, charitableimpact] = await fetchAll(search)
spinner.stop()
console.log(JSON.stringify({ benevity, canadaHelps, nooe, mycharityfund, charitableimpact }, null, 2))
