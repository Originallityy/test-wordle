// Extended list of words including some that are not 5 letters long
let wordList = [
  "apple",
  "grape",
  "peach",
  "mango",
  "berry",
  "lemon",
  "melon",
  "guava",
  "cherry",
  "olive",
  "banana",  // 6 letters
  "kiwi",    // 4 letters
  "plums",   // 5 letters
  "apricot", // 7 letters
  "cider",   // 5 letters
  "sugar",   // 5 letters
  "spice",   // 5 letters
  "flame",   // 5 letters
  "storm",   // 5 letters
  "nexus",   // 5 letters
  "pearl",   // 5 letters
  "orbit",   // 5 letters
  "earth",   // 5 letters
  "comet",   // 5 letters
  "laser",   // 5 letters
  "quark",   // 5 letters
];

// Filter out words that are not 5 letters long
wordList = wordList.filter(word => word.length === 5);

// Choose a random word each time the page refreshes
const answer = wordList[Math.floor(Math.random() * wordList.length)];
console.log("Answer is:", answer); // For debugging

const grid = document.getElementById("grid");
const guessInput = document.getElementById("guessInput");
const submitButton = document.getElementById("submitGuess");
const messageEl = document.getElementById("message");
const maxRows = 6;
let currentRow = 0;

// Initialize grid (6 rows x 5 columns)
function initGrid() {
  grid.innerHTML = "";
  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < 5; col++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute("data-row", row);
      tile.setAttribute("data-col", col);
      grid.appendChild(tile);
    }
  }
}

initGrid();

// Evaluate the guess and assign colors based on correctness
function evaluateGuess(guess) {
  const evaluation = Array(5).fill("absent");
  // Create a mutable copy of the answer
  const answerArr = answer.split("");
  
  // First pass: mark correct letters (green)
  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) {
      evaluation[i] = "correct";
      answerArr[i] = null; // Remove matched letter
    }
  }
  
  // Second pass: mark present letters (yellow)
  for (let i = 0; i < 5; i++) {
    if (evaluation[i] !== "correct" && answerArr.includes(guess[i])) {
      evaluation[i] = "present";
      // Remove the first occurrence of the letter
      answerArr[answerArr.indexOf(guess[i])] = null;
    }
  }
  
  return evaluation;
}

// Fill the current row with the guess and update tile classes based on evaluation  
function fillRow(guess, evaluation) {
  for (let i = 0; i < 5; i++) {
    const tile = document.querySelector(`.tile[data-row="${currentRow}"][data-col="${i}"]`);
    tile.textContent = guess[i];
    tile.classList.add(evaluation[i]);
  }
}

// Show a message below the game
function showMessage(msg) {
  messageEl.textContent = msg;
}

// Event handler for submitting a guess
function submitGuess() {
  const guess = guessInput.value.trim().toLowerCase();
  if (guess.length !== 5) {
    showMessage("Please enter a 5-letter word.");
    return;
  }
  
  // Evaluate the guess
  const evaluation = evaluateGuess(guess);
  fillRow(guess, evaluation);
  
  // Check for a win
  if (guess === answer) {
    showMessage("Congratulations! You guessed correctly!");
    guessInput.disabled = true;
    submitButton.disabled = true;
    return;
  }
  
  currentRow++;
  guessInput.value = "";
  
  // Check if player has used all attempts
  if (currentRow >= maxRows) {
    showMessage("Game over! The word was: " + answer);
    guessInput.disabled = true;
    submitButton.disabled = true;
  }
}

submitButton.addEventListener("click", submitGuess);
guessInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    submitGuess();
  }
});
