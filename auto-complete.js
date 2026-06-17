
import { _getRemainingTree } from "./auto-complete-helper.js";
import { _updateWordUsage } from "./auto-complete-helper.js";
import { _reorderWords } from "./auto-complete-helper.js";
export class trieNode {
  constructor(value) {
    this.children = {};
    this.value = value;
    this.endOfWord = false;
    this.rank = 0;
    this.numberOfWords = 0;
  }
  
  addWord(word) {
    const characters = word.toLowerCase().split("");
    if (this.findWord(word)) {
      this.useWord(word);
      return `${word} is already exist`;
    } else {
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
      this.numberOfWords += 1;
      return `${word} was added successfuly`
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
            words.push({ word: prefix, rank: currentNode.rank });
          }
          words.push(..._getRemainingTree(prefix, currentNode));
        }
      } else {
        return words;
      }
    }
    return _reorderWords(words);
  }

  useWord(word) {
    let rank = 0;
    if (this.findWord(word)) {
      rank = _updateWordUsage(word, this);
    }
    return rank;
  }
}

// module.exports = { trieNode };

// const root = new trieNode("");
// root.addWord("qw");
// console.log(root.useWord("qw"));

// words = root.predictWords("qw");
// console.log(words)
// // root.addWord("qwe");
// // root.addWord("qweds");
// // root.addWord("qasd");
// root.addWord("qsdt");
// root.addWord("qert");

// console.log(root.predictWords("q")); // ["hello", "hi", "hey", "he"]
// console.log(root.findWord("qsert")); // ["hello", "hi", "hey", "he"]
