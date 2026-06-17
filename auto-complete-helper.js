export const _getRemainingTree = function (prefix, node) {
  let currentNode = node;
  let words = [];
  for (const key in currentNode.children) {
    let accPrefix = prefix;
    if (currentNode.children[key].endOfWord) {
      words.push({word:prefix + key, rank:currentNode.children[key].rank});
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

export const _updateWordUsage = function (word, root) {
  let currNode = root;
  const chars = word.split("");
  let rank = 0;
  for (let i = 0; i < chars.length; i++) {
    if (i === chars.length - 1) {
      currNode.children[chars[i]].rank++;
      rank = currNode.children[chars[i]].rank;
    } else {
      currNode = currNode.children[chars[i]];
    }
  }
  return rank;
};

export const _reorderWords = function(words)
{
  return words
    .sort((a, b) => b.rank - a.rank)  
    .map(item => `${item.word} (${item.rank})`);    
};

// module.exports = { _getRemainingTree, _updateWordUsage, _reorderWords };
