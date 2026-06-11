const { handleSelection } = require("./handleSelection.js");
const { trieNode } = require("./auto-complete.js");

describe("Test handleSelection function", () => {
  const root = new trieNode("");
  test("test add function", () => {
    const result = handleSelection(root, "add apple");

    expect(result).toEqual({
      printMsg: "apple was added successfuly !!\n",
      terminate: false,
    });
  });
  test("test add function", () => {
    const result = handleSelection(root, "add apricote");

    expect(result).toEqual({
      printMsg: "apricote was added successfuly !!\n",
      terminate: false,
    });
  });
  test("test add function", () => {
    const result = handleSelection(root, "add 3edfr");

    expect(result).toEqual({
      printMsg: "Please use alphabet only\n",
      terminate: false,
    });
  });

  test("add missing argument", () => {
    const result = handleSelection(root, "add");
    expect(result).toEqual({
      printMsg: "Argument is required\n",
      terminate: false,
    });
  });

  // -----------------------------
  // FIND COMMAND TESTS
  // -----------------------------
  test("find existing word", () => {
    root.addWord("banana");
    const result = handleSelection(root, "find banana");
    expect(result).toEqual({
      printMsg: "banana found\n",
      terminate: false,
    });
  });

  test("find non-existing word", () => {
    const result = handleSelection(root, "find xyz");
    expect(result).toEqual({
      printMsg: "xyz not found\n",
      terminate: false,
    });
  });

  test("find invalid argument", () => {
    const result = handleSelection(root, "find 123");
    expect(result).toEqual({
      printMsg: "Please use alphabet only\n",
      terminate: false,
    });
  });

  // -----------------------------
  // COMPLETE COMMAND TESTS
  // -----------------------------
  test("complete prefix with matches", () => {
    root.addWord("cat");
    root.addWord("car");
    root.addWord("carbon");

    const result = handleSelection(root, "complete ca");
    expect(result).toEqual({
      printMsg: ["cat (0)", "car (0)", "carbon (0)"],
      terminate: false,
    });
  });

  test("complete prefix with no matches", () => {
    const result = handleSelection(root, "complete zz");
    expect(result).toEqual({
      printMsg: [],
      terminate: false,
    });
  });

  test("complete invalid argument", () => {
    const result = handleSelection(root, "complete 9x");
    expect(result).toEqual({
      printMsg: "Please use alphabet only\n",
      terminate: false,
    });
  });

  // -----------------------------
  // HELP COMMAND TEST
  // -----------------------------
  test("help command", () => {
    const result = handleSelection(root, "help");
    expect(result).toEqual({
      printMsg: `Commands:
  add <word>      - Add word to dictionary
  find <word>     - Check if word exists
  complete <prefix> - Get completions
  help           - Show this message
  exit           - Quit program\n`,
      terminate: false,
    });
  });

  // -----------------------------
  // EXIT COMMAND TEST
  // -----------------------------
  test("exit command", () => {
    const result = handleSelection(root, "exit");
    expect(result).toEqual({
      printMsg: "Goodbye !",
      terminate: true,
    });
  });

  // -----------------------------
  // INVALID COMMAND TEST
  // -----------------------------
  test("invalid command", () => {
    const result = handleSelection(root, "remove apple");
    expect(result).toEqual({
      printMsg: "Invalid command\n",
      terminate: false,
    });
  });

  // -----------------------------
  // COMPLETE COMMAND TESTS
  // -----------------------------
  test("use function", () => {
    const result = handleSelection(root, "use cat");
    expect(result).toEqual({
      printMsg: "Incremented usage for cat (now 1)",
      terminate: false,
    });
  });

  test("complete prefix with matches", () => {
    root.useWord("cat");
    root.useWord("car");
    root.useWord("car");
    root.useWord("car");
    root.useWord("carbon");

    const result = handleSelection(root, "complete ca");
    expect(result).toEqual({
      printMsg: ["car (3)", "cat (2)", "carbon (1)"],
      terminate: false,
    });
  });

});
