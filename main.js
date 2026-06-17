// const { handleSelection } = require("./handleSelection.js");
// const { trieNode } = require("./auto-complete.js");

import { trieNode } from "./auto-complete.js";
import { handleSelection } from "./handleSelection.js";

const root = new trieNode("");
const dropDown = document.querySelector("#sugg-dropdown");
const statusMsg = document.querySelector("#status-msg");
const wordCound = document.querySelector("#num-of-words");
const wordInput = document.querySelector("#word-input");
const input = document.querySelector("#suggestion-input");
const ul = document.querySelector("#word-list");

dropDown.classList.add("hidden");

// UI - presentation logic - translates data to UI
function handleAddCommandResponse(addCmdResponse, numOfWords) {
  wordInput.value = "";
  input.value = "";
  document.getElementById("word-list").innerHTML = "";
  statusMsg.innerHTML = addCmdResponse;
  wordCound.innerHTML = numOfWords;
  if (addCmdResponse.includes("was added successfuly")) {
    document.getElementById("status-msg").style.backgroundColor = "";
  } else if (addCmdResponse.includes("exist")) {
    document.getElementById("status-msg").style.backgroundColor =
      "yellow";
    statusMsg.innerHTML += ", rank was add!";
  } else {
    document.getElementById("status-msg").style.backgroundColor = "red";
  }
}

function orderWords(words) {
  let objArr = [];
  for (let item of words) {
    let word = item.split(" ")[0];
    let rank = Number(item.split(" ")[1].replace(/[()]/g, ""));
    objArr.push({ word: word, rank: rank });
  }
  console.log(objArr.sort((a, b) => b.rank - a.rank));
  return objArr.sort((a, b) => b.rank - a.rank).map((item) => item.word);
}

function handleAddCompleteWords(words) {
  document.getElementById("word-list").innerHTML = "";
  if (input.value.trim() !== "") {
    dropDown.classList.remove("hidden");
    let wordList = orderWords(words);
    for (let item of wordList) {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    }
  } else {
    dropDown.classList.add("hidden");
  }
}

function handleAddWordInput() {
  input.value = "";
  statusMsg.innerHTML = "";
  document.getElementById("status-msg").style.backgroundColor = "";
  document.getElementById("word-list").innerHTML = "";
  dropDown.classList.add("hidden");
}

// Controller
addEventListener("DOMContentLoaded", () => {
  //   refreshShoppingList(getList());

  document.querySelector("#add-word").addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.querySelector("#word-input");
    const addCommand = `add ${input.value}`;
    let exeStatus = handleSelection(root, addCommand);
    console.log(exeStatus);
    handleAddCommandResponse(exeStatus.printMsg, root.numberOfWords);
  });

  document.querySelector("#suggestion-input").addEventListener("input", (e) => {
    e.preventDefault();
    const addCommand = `complete ${e.data}`;
    let exeStatus = handleSelection(root, addCommand);
    console.log(exeStatus);
    handleAddCompleteWords(exeStatus.printMsg);
  });
  document.querySelector("#word-input").addEventListener("input", (e) => {
    e.preventDefault();
    handleAddWordInput();
  });
});
