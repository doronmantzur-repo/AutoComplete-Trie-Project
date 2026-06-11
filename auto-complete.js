const { _getRemainingTree } = require("./auto-complete-helper.js");
class trieNode {
  constructor(value) {
    this.children = {};
    this.value = value;
    this.endOfWord = false;
  }
  addWord(word) {
    const characters = word.toLowerCase().split("");
    let currentNode = this;
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      if (!currentNode.children[char]) {
        currentNode.children[char] = new trieNode(char);
      }

      if (i === characters.length - 1) {
        currentNode.children[char].endOfWord = true;
      }
      currentNode = currentNode.children[char];
    }
  }

  findWord(word) {
    const characters = word.toLowerCase().split("");
    let currentNode = this;
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      if (currentNode.children[char]) {
        if (
          currentNode.children[char].endOfWord &&
          i === characters.length - 1
        ) {
          return true;
        }
        currentNode = currentNode.children[char];
      } else {
        return false;
      }
    }
  }

  predictWords(prefix) {
    prefix = prefix.toLowerCase();
    const characters = prefix.split("");
    let currentNode = this;
    let words = [];
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
        if (i === characters.length - 1) {
          if (currentNode.endOfWord) {
            words.push(prefix);
          }
          words.push(..._getRemainingTree(prefix, currentNode));
        }
      } else {
        return words;
      }
    }
    return words;
  }
}

module.exports = { trieNode };



// const root = new trieNode("");
// // root.addWord("qw");
// // root.addWord("qwe");
// // root.addWord("qweds");
// // root.addWord("qasd");
// root.addWord("qsdt");
// root.addWord("qert");

// console.log(root.predictWords("q")); // ["hello", "hi", "hey", "he"]
// console.log(root.findWord("qsert")); // ["hello", "hi", "hey", "he"]
