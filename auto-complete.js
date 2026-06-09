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
      
      if(i=== characters.length - 1) {
        currentNode.endOfWord = true;
      }
      currentNode = currentNode.children[char];
    }
  }

  findWord(root, word) {
    const characters = word.split("");
    let currentNode = root;
    for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        if (currentNode.children[char]) {
            if(currentNode.endOfWord && i === characters.length - 1) {
                return true;
            }
          currentNode = currentNode.children[char];
         
        } else {
          return false;
        }
      }
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
// console.log(root.findWord(root, "hello")); // true
console.log(root.findWord(root, "hi"));
console.log(root.findWord(root, "hey"));
console.log(root.findWord(root, "he"));
console.log(root.findWord(root, "ber"));