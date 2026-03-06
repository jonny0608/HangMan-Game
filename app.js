const cards = ["diamond", "spade", "heart", "club"];
let currentCard = cards[Math.floor(Math.random() * 4)];

while (currentCard !== "spade") {
  console.log(currentCard);
  currentCard = cards[Math.floor(Math.random() * 4)];
console.log(currentCard)
}

// Write your code below
