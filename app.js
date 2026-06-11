const { validateArguments, validateCommand } = require("./validation.js");
const { handleCommand } = require("./handleCommand.js");
const { trieNode } = require("./auto-complete.js");
const { execSync } = require("node:child_process");
const prompt = require("prompt-sync")();

console.log("=== AutoComplete Trie Console ===");
console.log("Type 'help' for commands");
const root = new trieNode("");

const handleSelection = function (selection) {
  selection = selection.split(" ");
  let command = selection[0];
  let argument = "";
  let statusObj = { printMsg: "", terminate: false };

  const cmdStatus = validateCommand(command);
  if (!cmdStatus.valid) {
    statusObj.printMsg = cmdStatus.errors[0].message;
  } else {
    command = command.toLowerCase();
    if (command !== "help" || command != "exit") {
      argument = selection[1];
    }

    cmdValid = validateArguments(command, argument);
    if (!cmdValid.valid) {
      statusObj.printMsg = cmdValid.errors[0].message;
    } else {
      statusObj.printMsg = handleCommand(root, command, argument);
      if (command === "exit") statusObj.terminate = true;
    }
  }
  return statusObj;
};

while (true) {

  let selectedOption = prompt();
  exeStatus = handleSelection(selectedOption);
  console.log(exeStatus.printMsg);
  if (exeStatus.terminate) break;
}
