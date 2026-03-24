

// Listen for the event that fires when the HTML page finishes loading
document.addEventListener("DOMContentLoaded", function () {
  // Any code inside this function will run
  // as soon as the page is fully loaded
  startGame();
});
// This is an example function structure
// You will place your game setup logic inside it
let secretWord = "";
function startGame() {


  const wordList = ["Monopoly", "Chutes and Ladders", "Mouse trap", "Trouble", "The game of life", "Candy land", "Clue", "Risk", "Sorry", "Battleship", "Connect 4", "Jenga", "Twister", "Operation", "Pictionary", "Scrabble", "Taboo", "Trivial Pursuit", "Uno", "Go Fish"];
  secretWord = wordList[Math.floor(Math.random() * wordList.length)];
  console.log("The secret word is: " + secretWord);
  // Example things your game might do here:
  // • pick the random word
  // • reset variables
  // • build the starting display
  // • update elements on the page
}
function pressLetter(letter) {
  // This function will run when a letter button is pressed
  // You will need to write the logic to check if the letter is in the word
  console.log("You pressed the letter: " + letter);
  if (secretWord.includes(letter)) {
    console.log("The letter " + letter + " is in the word!");
  } else {
    console.log("The letter " + letter + " is NOT in the word.");
  }
}

const newGame = document.querySelector("#new-game");
newGame.addEventListener("click", function () {
  window.location.replace("Game.html");
  console.log("You clicked the new game button!");
});

const resetGame = document.querySelector("#reset-game");
resetGame.addEventListener("click", function () {
  window.location.replace("Index.html");
  console.log("clicked the reset game button!");
});

let display = "";   // This variable will hold the string we build for the screen
// Loop through every letter in the secret word
// i starts at 0 because strings use zero-based indexing
// The loop will run once for each character in the word
for (let i = 0; i < secretWord.length; i++) {
  // Get the letter at the current position in the word
  // charAt(i) returns the character located at index i
  let letter = secretWord.charAt(i);
  // Check if this letter exists in the guessedLetters array
  // includes() returns true if the letter exists in the array
  if (guessedLetters.includes(letter)) {

    // If the letter has been guessed,
    // add the letter to the display string
    // A space is added so the letters appear spaced out
    display += letter + " ";

  } else {

    // If the letter has NOT been guessed,
    // add an underscore instead
    display += "_ ";
  }

}
