const validateCommand = (command) => {
  const validCommands = ["add", "find", "complete", "help", "exit"];
  const errors = [];

  if (!validCommands.includes(command.toLowerCase())) {
    errors.push({ message: "Invalid command" });
  }

  return {
    valid: errors.length === 0,
    errors
  };
};


const validateArguments = (command, argument) => {
  const errors = [];
  if (command === "add" || command === "find" || command === "complete") {
    if (!argument) {
      errors.push({ message: "Argument is required" });
    }
    else if(!/^[A-Za-z]+$/.test(argument))
    {
        errors.push({ message: "Please use alphabet only"});
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

module.exports = { validateArguments, validateCommand };