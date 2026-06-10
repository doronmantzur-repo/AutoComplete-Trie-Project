const validateCommand = (command, argument) => {
  const validCommands = ["add", "find", "complete", "help"];
  const errors = [];

  if (!validCommands.includes(command)) {
    errors.push({ message: "Invalid command" });
  }

  if (command === "add" || command === "find" || command === "complete") {
    if (!argument) {
      errors.push({ message: "Argument is required" });
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

module.exports = { validateCommand };