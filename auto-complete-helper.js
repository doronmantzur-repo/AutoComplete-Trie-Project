const _getRemainingTree = function (prefix, node) {
  const characters = prefix.split("");
  let currentNode = node;
  let words = [];
  for (const key in currentNode.children) {
    if (currentNode.children[key].endOfWord) {
      words.push(prefix + key);
      if (Object.keys(currentNode.children[key].children).length > 0) {
        let value = _getRemainingTree(prefix + key, currentNode.children[key]);
        words.push(...value);
      }
    } else {
      prefix = prefix + key;
      let value = _getRemainingTree(prefix, currentNode.children[key]);
      words.push(...value);
    }
  }
  return words;
};

module.exports = { _getRemainingTree };
