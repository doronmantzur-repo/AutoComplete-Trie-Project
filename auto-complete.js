class trieNode {
  constructor(value) {
    this.children = {};
    this.value = value;
    this.endOfWord = false;
  }
  addWord(root, word) {
    const characters = word.split("");
    let currentNode = root;
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      if (!currentNode.children[char]) {
        currentNode.children[char] = new trieNode(char);
      }
      currentNode = currentNode.children[char];
      if(i=== characters.length - 1) {
        currentNode.endOfWord = true;
      }
    }
  }

  findWord(root, word) {
    const characters = word.split("");
  }

  predictWords(root, prefix) {
    const characters = prefix.split("");
  }
}

const root = new trieNode("");
root.addWord(root, "hello");
root.addWord(root, "hi");
root.addWord(root, "hey");
root.addWord(root, "he");
