
const { handleSelection } = require("./handleSelection.js");
const { trieNode } = require("./auto-complete.js");
const { execSync } = require("node:child_process");
const prompt = require("prompt-sync")();

console.log("=== AutoComplete Trie Console ===");
console.log("Type 'help' for commands");
const root = new trieNode("");


while (true) {

  let selectedOption = prompt();
  exeStatus = handleSelection(root, selectedOption);
  console.log(exeStatus.printMsg);
  if (exeStatus.terminate) break;
}
