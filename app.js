// ===============================
// Board Game Hangman
// ===============================

// Word banks with at least 10 total words
const easyWords = [
  "clue",
  "risk",
  "uno",
  "sorry",
  "jenga"
];

const mediumWords = [
  "scrabble",
  "monopoly",
  "trouble",
  "twister",
  "taboo"
];

const hardWords = [
  "battleship",
  "candyland",
  "operation",
  "pictionary",
  "connectfour"
];

// Game variables
let secretWord = "";
let guessedLetters = [];
let wrongLetters = [];
let maxWrongGuesses = 6;
let gameStarted = false;
let selectedDifficulty = "";
let currentWordBank = [];

// Page elements
const easyBtn = document.getElementById("easy-btn");
const mediumBtn = document.getElementById("medium-btn");
const hardBtn = document.getElementById("hard-btn");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const menuBtn = document.getElementById("menu-btn");

const wordDisplay = document.getElementById("word-display");
const usedLettersText = document.getElementById("used-letters");
const wrongLettersText = document.getElementById("wrong-letters");
const remainingGuessesText = document.getElementById("remaining-guesses");
const gameMessage = document.getElementById("game-message");
const resultMessage = document.getElementById("result-message");
const healthImage = document.getElementById("health-image");
const keyboard = document.getElementById("keyboard");

// Listen for page load
document.addEventListener("DOMContentLoaded", function () {
  createKeyboard();
  resetScreenOnly();
});

// Difficulty buttons
easyBtn.addEventListener("click", function () {
  selectedDifficulty = "easy";
  maxWrongGuesses = 8;
  currentWordBank = easyWords;
  startGame();
});

mediumBtn.addEventListener("click", function () {
  selectedDifficulty = "medium";
  maxWrongGuesses = 6;
  currentWordBank = mediumWords;
  startGame();
});

hardBtn.addEventListener("click", function () {
  selectedDifficulty = "hard";
  maxWrongGuesses = 4;
  currentWordBank = hardWords;
  startGame();
});

// Guess button
guessBtn.addEventListener("click", function () {
  handleGuess();
});

// Enter key submission
guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleGuess();
  }
});

// Restart without reloading page
restartBtn.addEventListener("click", function () {
  restartGame();
});

// Back to menu
menuBtn.addEventListener("click", function () {
  window.location.href = "index.html";
});

// Start game
function startGame() {
  guessedLetters = [];
  wrongLetters = [];
  gameStarted = true;
  resultMessage.textContent = "";
  resultMessage.className = "text-center result-text";
  guessInput.value = "";

  // Random word selection
  secretWord = currentWordBank[Math.floor(Math.random() * currentWordBank.length)];

  // Disable difficulty buttons after game starts
  easyBtn.disabled = true;
  mediumBtn.disabled = true;
  hardBtn.disabled = true;

  enableKeyboardButtons();
  updateDisplay();
  updateHealthImage();

  gameMessage.textContent = "Game started on " + selectedDifficulty.toUpperCase() + " mode.";
  console.log("Secret Word:", secretWord);
}

// Handle guess
function handleGuess() {
  if (!gameStarted) {
    gameMessage.textContent = "Choose a difficulty first.";
    return;
  }

  let userGuess = guessInput.value.toLowerCase();
  guessInput.value = "";
  guessInput.focus();

  // Input validation
  if (userGuess.length !== 1) {
    gameMessage.textContent = "Please enter only one letter.";
    return;
  }

  if (userGuess < "a" || userGuess > "z") {
    gameMessage.textContent = "Please enter a letter from A to Z.";
    return;
  }

  // Prevent duplicate guesses
  if (guessedLetters.includes(userGuess) || wrongLetters.includes(userGuess)) {
    gameMessage.textContent = "You already guessed that letter.";
    return;
  }

  // Check guess
  if (secretWord.includes(userGuess)) {
    guessedLetters.push(userGuess);
    gameMessage.textContent = "Correct guess.";
  } else {
    wrongLetters.push(userGuess);
    gameMessage.textContent = "Wrong guess.";
  }

  disableKeyboardButton(userGuess);
  updateDisplay();
  updateHealthImage();
  checkWinOrLose();
}

// Update display
function updateDisplay() {
  let display = "";

  // Required charAt() and loop logic
  for (let i = 0; i < secretWord.length; i++) {
    let letter = secretWord.charAt(i);

    if (guessedLetters.includes(letter)) {
      display += letter.toUpperCase() + " ";
    } else {
      display += "_ ";
    }
  }

  wordDisplay.textContent = display.trim();

  if (guessedLetters.length > 0 || wrongLetters.length > 0) {
    let allUsedLetters = guessedLetters.concat(wrongLetters);
    usedLettersText.textContent = "Used Letters: " + allUsedLetters.join(", ").toUpperCase();
  } else {
    usedLettersText.textContent = "Used Letters: None";
  }

  if (wrongLetters.length > 0) {
    wrongLettersText.textContent = "Wrong Letters: " + wrongLetters.join(", ").toUpperCase();
  } else {
    wrongLettersText.textContent = "Wrong Letters: None";
  }

  remainingGuessesText.textContent =
    "Guesses Remaining: " + (maxWrongGuesses - wrongLetters.length);
}

// Check win or lose
function checkWinOrLose() {
  let playerWon = true;

  for (let i = 0; i < secretWord.length; i++) {
    let letter = secretWord.charAt(i);

    if (!guessedLetters.includes(letter)) {
      playerWon = false;
    }
  }

  if (playerWon) {
    resultMessage.textContent = "You Win!";
    resultMessage.className = "text-center result-text win-text";
    gameMessage.textContent = "All letters were revealed.";
    gameStarted = false;
    disableKeyboardButtons();
    return;
  }

  if (wrongLetters.length >= maxWrongGuesses) {
    resultMessage.textContent = "You Lose! The word was " + secretWord.toUpperCase() + ".";
    resultMessage.className = "text-center result-text lose-text";
    gameMessage.textContent = "You ran out of guesses.";
    gameStarted = false;
    revealWord();
    disableKeyboardButtons();
  }
}

// Reveal word if player loses
function revealWord() {
  let fullWord = "";

  for (let i = 0; i < secretWord.length; i++) {
    fullWord += secretWord.charAt(i).toUpperCase() + " ";
  }

  wordDisplay.textContent = fullWord.trim();
}

// Restart game without reloading
function restartGame() {
  secretWord = "";
  guessedLetters = [];
  wrongLetters = [];
  maxWrongGuesses = 6;
  gameStarted = false;
  selectedDifficulty = "";
  currentWordBank = [];

  easyBtn.disabled = false;
  mediumBtn.disabled = false;
  hardBtn.disabled = false;

  enableKeyboardButtons();
  resetScreenOnly();
}

// Reset visible screen
function resetScreenOnly() {
  wordDisplay.textContent = "_ _ _ _";
  usedLettersText.textContent = "Used Letters: None";
  wrongLettersText.textContent = "Wrong Letters: None";
  remainingGuessesText.textContent = "Guesses Remaining: 6";
  gameMessage.textContent = "Choose a difficulty to begin.";
  resultMessage.textContent = "";
  resultMessage.className = "text-center result-text";
  guessInput.value = "";
  updateHealthImage();
}

// Create keyboard with loop
function createKeyboard() {
  keyboard.innerHTML = "";

  for (let i = 65; i <= 90; i++) {
    let letter = String.fromCharCode(i).toLowerCase();
    let button = document.createElement("button");

    button.textContent = letter.toUpperCase();
    button.className = "btn btn-light";
    button.id = "key-" + letter;

    button.addEventListener("click", function () {
      guessInput.value = letter;
      handleGuess();
    });

    keyboard.appendChild(button);
  }
}

// Disable one keyboard button
function disableKeyboardButton(letter) {
  let button = document.getElementById("key-" + letter);
  if (button) {
    button.disabled = true;
  }
}

// Disable all keyboard buttons
function disableKeyboardButtons() {
  let buttons = keyboard.querySelectorAll("button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

// Enable all keyboard buttons
function enableKeyboardButtons() {
  let buttons = keyboard.querySelectorAll("button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

// Update local health images
function updateHealthImage() {
  let guessesLeft = maxWrongGuesses - wrongLetters.length;

  if (guessesLeft >= 8) {
    healthImage.src = "Healthymonoplyman.png";
  } else if (guessesLeft === 7) {
    healthImage.src = "images/health5.png";
  } else if (guessesLeft === 6) {
    healthImage.src = "images/health4.png";
  } else if (guessesLeft === 5) {
    healthImage.src = "images/health3.png";
  } else if (guessesLeft === 4) {
    healthImage.src = "images/health2.png";
  } else if (guessesLeft === 3) {
    healthImage.src = "images/health2.png";
  } else if (guessesLeft === 2) {
    healthImage.src = "images/health1.png";
  } else if (guessesLeft === 1) {
    healthImage.src = "images/health1.png";
  } else {
    healthImage.src = "images/Monoplymandead.png";
  }
}