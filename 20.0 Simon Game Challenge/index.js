/**
 * There are 2 states in this game.
 *
 * If gameStarted === false, the window will have a keydown listener.
 * If gameStarted === true, the buttons will have a click listener.
 *
 * I will create a function nextButton() which returns the id of a random button. This is used to get the next button in the sequence.
 *
 * I will keep track of the correct sequence using an array.
 * I will also keep track of the user's current clicked sequence using another array.
 *
 * I will create functions handleStartGame() and handleStopGame() that handles starting and stopping the game.
 * It will set gameStarted, and add/remove listeners.
 *
 * I will create a function checkUserArray() which checks the current user array against the correct array and returns a Bool.
 *
 * I will create a function showCorrectSequence() that will use the mp3 files and animation to show the new correct sequence to the user.
 *
 * I will create a function handleLevelPassed() that will handle the user passing a level (the level is defined by the size of the correct array).
 * The functionality will be:
 * 1. Clearing the user array
 * 2. Make the buttons not clickable
 * 3. Use nextButton() to get the id of the next button
 * 4. Add the id to the correct sequence array
 * 5. Use showCorrectSequence() to show the new sequence
 * 6. Make the buttons clickable again
 *
 * I will create a function gameOver() that will:
 * 1. Clear the user array
 * 2. Clear the correct sequence array
 * 3. Use the mp3 files and html to notify the user that the game is over
 * 4. Call handleStopGame()
 *
 * Every time the user clicks a button, it will get added to the userSequence array, which then gets checked against the correct sequence array,
 * up to the size of the user sequence.
 * - If the user's sequence is correct up to its size and is smaller than the correct sequence, nothing will happen.
 * - If the user's sequence is correct up to its size and is the same size as the correct sequence, call handleLevelPassed().
 * - If the user's sequence is not correct, call gameOver().
 *
 */

var gameStarted = false;
var correctSeq = [];
var userSeq = [];

/**
 * @returns The id of a randomly selected button
 */
function nextButton() {
  var buttonNum = Math.floor(Math.random() * 4);

  switch (buttonNum) {
    case 0:
      return "green";

    case 1:
      return "red";

    case 2:
      return "yellow";

    case 3:
      return "blue";

    default:
      console.log("invalid num=" + num);
      return "green";
  }
}

/**
 * Shows button click animation, updates userSeq and checks if it is correct or wrong
 * @param {Event} event The event of the button click
 */
function onButtonClicked(event) {
  var buttonId = this.id;
  playSound(buttonId);

  $("#" + buttonId).addClass("pressed");
  setTimeout(() => {
    $("#" + buttonId).removeClass("pressed");

    userSeq.push(buttonId);
    var userCorrect = isUserArrayCorrect();
    if (userCorrect) {
      if (userSeq.length === correctSeq.length) {
        handleLevelPassed();
      }
    } else {
      gameOver();
    }
  }, 100);
}

/**
 * Handles setting gameStarted and adding/removing event listeners
 */
function handleRestartGame() {
  gameStarted = true;
  $(document).off("keydown");
  $("#level-title").text("Get Ready...");

  var firstButton = nextButton();
  correctSeq.push(firstButton);
  showNextButton();
}

/**
 * Handles setting gameStarted and adding/removing event listeners
 */
function handleStopGame() {
  gameStarted = false;
  $(document).on("keydown", handleRestartGame);
  console.log("off");
  $(".btn").off("click");
}

/**
 * @returns Whether the user array is correct so far
 */
function isUserArrayCorrect() {
  console.log("correct seq=" + correctSeq);
  console.log("user seq=" + userSeq);
  // Sanity check
  if (userSeq.length > correctSeq.length) {
    return false;
  }

  for (var i = 0; i < userSeq.length; i++) {
    if (userSeq[i] !== correctSeq[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Plays the sound of the corresponding button of the give button id.
 * @param {String} audioName The id of the button you want to play a sound for
 */
function playSound(audioName) {
  switch (audioName) {
    case "green":
      new Audio("./sounds/green.mp3").play();
      break;

    case "red":
      new Audio("./sounds/red.mp3").play();
      break;

    case "yellow":
      new Audio("./sounds/yellow.mp3").play();
      break;

    case "blue":
      new Audio("./sounds/blue.mp3").play();
      break;

    case "wrong":
      new Audio("./sounds/wrong.mp3").play();
      break;

    default:
      console.log("invalid color=" + color);
      break;
  }
}

/**
 * Animates a flash for the corresponding button of the given button id.
 * @param {String} buttonId The button to be flashed
 */
function flashButton(buttonId) {
  $("#" + buttonId)
    .fadeOut(100)
    .fadeIn(100);
}

/**
 * Shows user the correct sequence by flashing and playing the sound of the buttons specified in correctSeq in order.
 */
function showNextButton() {
  setTimeout(function () {
    var buttonId = correctSeq[correctSeq.length - 1];
    playSound(buttonId);
    flashButton(buttonId);
    incrementLevel();
    $(".btn").on("click", onButtonClicked);
  }, 1000);
}

function incrementLevel() {
  $("#level-title").text("Level " + correctSeq.length);
}

/**
 * Completes the following in order:
 * 1. Change level-title to show the correct level
 * 2. Clears the user array
 * 3. Removes button click event listener
 * 4. Uses nextButton() to get the id of the next button
 * 5. Adds the id to correctSeq
 * 6. Uses showCorrectSequence() to show the new sequence
 * 7. Adds button click event listener after showCorrectSequence() is done
 */
function handleLevelPassed() {
  userSeq = [];
  console.log("off");
  $(".btn").off("click");
  var buttonId = nextButton();
  correctSeq.push(buttonId);
  showNextButton();
}

/**
 * Completes the following in order:
 * 1. Clears the user array
 * 2. Clears the correct sequence array
 * 3. Uses the mp3 files and html to notify the user that the game is over
 * 4. Calls handleStopGame()
 */
function gameOver() {
  userSeq = [];
  correctSeq = [];

  playSound("wrong");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);

  handleStopGame();
}

$(document).on("keydown", handleRestartGame);