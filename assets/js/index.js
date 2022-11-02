const BTN_COLORS = ["red", "blue", "green", "yellow"];

let pattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

$(document).keypress(function () {
  if (gameStarted === false) {
    gameStarted = true;
    $("#game-title").text("Level " + level);
    nextSequence();
  }
});

$(".square").click(function () {
  if (gameStarted) {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
  }
});

function nextSequence() {
  let randomBtn = Math.floor(Math.random() * 4);
  let randomChosenColor = BTN_COLORS[randomBtn];

  pattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {
  let soundEffect = new Audio("./assets/sounds/" + name + ".mp3");
  soundEffect.play();
}

function animatePress(currentColor) {
  $("#" + currentColor)
    .addClass("pressed")
    .delay(100)
    .queue(function (next) {
      $(this).removeClass("pressed");
      next();
    });
}

function checkAnswer() {
  let userClickedIndex = userClickedPattern.length - 1;
  if (pattern[userClickedIndex] === userClickedPattern[userClickedIndex]) {
    if (userClickedPattern.length === pattern.length) goToNextLevel();
  } else startOver();
}

function goToNextLevel() {
  userClickedPattern = [];
  level++;
  $("#game-title")
    .text("Level " + level)
    .delay(1000)
    .queue(function (next) {
      nextSequence();
      next();
    });
}

function animateGameOver() {
  $("#game-title").text("Game Over, Press Any Key to Restart");
  $("body")
    .addClass("game-over")
    .delay(200)
    .queue(function (next) {
      $(this).removeClass("game-over");
      next();
    });
}

function startOver() {
  animateGameOver();
  level = 0;
  pattern = [];
  gameStarted = false;
}
