var buttons = document.querySelectorAll("button.drum");

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("mousedown", function () {
    playAudio(this.innerHTML);
    animateKey(this.innerHTML, true);
  });
  buttons[i].addEventListener("mouseup", function () {
    animateKey(this.innerHTML, false);
  });
}

document.addEventListener("keydown", function (event) {
  playAudio(event.key);
  animateKey(event.key, true);
});

document.addEventListener("keyup", function (event) {
  animateKey(event.key, false);
});

function playAudio(key) {
  switch (key) {
    case "w":
      var sound = new Audio("./sounds/tom-1.mp3");
      sound.play();
      break;

    case "a":
      var sound = new Audio("./sounds/tom-2.mp3");
      sound.play();
      break;

    case "s":
      var sound = new Audio("./sounds/tom-3.mp3");
      sound.play();
      break;

    case "d":
      var sound = new Audio("./sounds/tom-4.mp3");
      sound.play();
      break;

    case "j":
      var sound = new Audio("./sounds/kick-bass.mp3");
      sound.play();
      break;

    case "k":
      var sound = new Audio("./sounds/snare.mp3");
      sound.play();
      break;

    case "l":
      var sound = new Audio("./sounds/crash.mp3");
      sound.play();
      break;

    default:
      console.log(this);
      break;
  }
}

function animateKey(key, pressed) {
  var activeButton = document.querySelector("." + key);
  if (pressed) {
    activeButton.classList.add("pressed");
  } else {
    activeButton.classList.remove("pressed");
  }
}
