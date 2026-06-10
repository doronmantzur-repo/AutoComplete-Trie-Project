// import promptSync from "prompt-sync";

const { validateCommand } = require("./validation.js");
const prompt = require("prompt-sync")();

console.log("=== AutoComplete Trie Console ===");
console.log("Type 'help' for commands");


while (true) {
  let selectedOption = prompt();
  selectedOption = selectedOption.split(" ");
  const command = selectedOption[0];
  let argument = "";
  
  if (command === "exit") {
    console.log("Exiting...");
    break;
  }
  else if (command !== "help") {
    argument = selectedOption[1];
  }

  cmdValid = validateCommand(command, argument);
  if (!cmdValid.valid) {
    console.log("Invalid command: " + cmdValid.errors[0].message);
    continue;
  }
  
  console.log(handleCommand(command, argument));

}
