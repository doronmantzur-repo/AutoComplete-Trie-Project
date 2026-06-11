const _getRemainingTree = function (prefix, node) {
  let currentNode = node;
  let words = [];
  for (const key in currentNode.children) {
    let accPrefix = prefix
    if (currentNode.children[key].endOfWord) {
      words.push(prefix + key);
      if (Object.keys(currentNode.children[key].children).length > 0) {
        let value = _getRemainingTree(prefix + key, currentNode.children[key]);
        words.push(...value);
      }
    } else {
      accPrefix = accPrefix + key;
      let value = _getRemainingTree(accPrefix, currentNode.children[key]);
      words.push(...value);
    }
  }
  return words;
};

module.exports = { _getRemainingTree };
