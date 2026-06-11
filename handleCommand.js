const helpStr = `Commands:
  add <word>      - Add word to dictionary
  find <word>     - Check if word exists
  complete <prefix> - Get completions
  help           - Show this message
  exit           - Quit program\n`;

const handleCommand = (root, command, argument) => {
  words = [];
  if (argument) {
    argument = argument.toLowerCase();
  }

  switch (command.toLowerCase()) {
    case "add":
      root.addWord(argument);
      return `${argument} was added successfuly !!\n`;

    case "find":
      isExist = root.findWord(argument);
      return (isExist
        ? `${argument.toLowerCase()} found\n`
        : `${argument.toLowerCase()} not found\n`);

    case "complete":
      words = root.predictWords(argument);
      return words;

    case "help":
      return helpStr;

    case "exit":
      return "Goodbye !";
  }
};

module.exports = { handleCommand };
