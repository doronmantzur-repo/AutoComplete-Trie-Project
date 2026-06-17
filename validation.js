export const validateCommand = (command) => {
  const validCommands = ["add", "find", "complete", "help", "exit", "use"];
  const errors = [];

  if (!validCommands.includes(command.toLowerCase())) {
    errors.push({message: "Invalid command\n" });
  }

  return {
    valid: errors.length === 0,
    errors
  };
};


export const validateArguments = (command, argument) => {
  const errors = [];
  command = command.toLowerCase();
  if (command === "add" || command === "find" || command === "complete") {
    if (!argument) {
      errors.push({ message: "Argument is required\n" });
    }
    else if(!/^[A-Za-z]+$/.test(argument))
    {
        errors.push({ message: "Please use alphabet only\n"});
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

// module.exports = { validateArguments, validateCommand };