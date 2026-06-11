const { validateArguments, validateCommand } = require("./validation.js");
const { handleCommand } = require("./handleCommand.js");
const { trieNode } = require("./auto-complete.js");
const prompt = require("prompt-sync")();

console.log("=== AutoComplete Trie Console ===");
console.log("Type 'help' for commands");
const root = new trieNode("");

while (true) {
  console.log("\n");
  let selectedOption = prompt();
  selectedOption = selectedOption.split(" ");
  const command = selectedOption[0];
  let argument = "";

  const cmdStatus = validateCommand(command);
  if (!cmdStatus.valid) {
    console.log(cmdValid.errors[0].message);
    continue;
  }

  if (command !== "help" || command != "exit") {
    argument = selectedOption[1];
  }

  cmdValid = validateArguments(command, argument);
  if (!cmdValid.valid) {
    console.log(cmdValid.errors[0].message);
    continue;
  }

  let cmdExeStatus = handleCommand(root, command, argument);
  console.log(cmdExeStatus);
  if (cmdStatus.valid && command.toLocaleLowerCase() == "exit") {
    break;
  }
}
