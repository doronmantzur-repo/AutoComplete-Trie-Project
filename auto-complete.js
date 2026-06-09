class trieNode {
  constructor(value) {
    this.children = {};
    this.value = value;
    this.endOfWord = false;
  }
  addWord(word) {
    const characters = word.split("");
  }

  findWord(word) {
    const characters = word.split("");
  }

  predictWords(prefix) {
    const characters = prefix.split("");
  }
}

const root = new trieNode("");
