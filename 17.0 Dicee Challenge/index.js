// Random number generator
function randomDiceGenerator() {
    return Math.floor(Math.random() * 6) + 1;
}

// Get random dice
var dice1 = randomDiceGenerator();
var dice2 = randomDiceGenerator();

document.querySelector(".img1").src = "./images/dice" + dice1 + ".png";
document.querySelector(".img2").src = "./images/dice" + dice2 + ".png";

if (dice1 > dice2) {
    document.getElementById("title").textContent = "🚩Player 1 Wins!";
} else if (dice2 > dice1) {
    document.getElementById("title").textContent = "🚩Player 2 Wins!";
} else {
    document.getElementById("title").textContent = "Draw!";
}