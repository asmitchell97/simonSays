//Variable to determine the game state, game begin (0), game paused (1) game playing (2)
var gameState = 0;

//Counters to keep track of score
var currentScore = 0;
var hiScore = 0;

//Arrays to contain simon entrys and player entrys
var simonEntries = [];
var playerEntries = [];

//Listener for keyboard press
$(document).on("keydown", e => {

  //Check Game state
  switch (gameState) {
    case 0:
      //Start a new game
      newGame();
      break;
    case 1:
      //Game is paused
      break;
    case 2:
      //Game is being played
    default:

}
});

//Add listener for on click of button
$(".btn").on("click", e => {

  switch (gameState) {
    case 0:
      newGame();
      break;
    case 1:

      break;
    case 2:
      //Get reference to the id of button clicked
      var colorId = e.currentTarget.id;
      buttonAnimation(colorId);

      //Check against the simonEntries to see if correct
      playerEntries.push(colorId);
      checkSimon();

      break;
    default:

  }
});

//Start a new Game
function newGame(){
  //Game state paused
  gameState = 1;

  //Reset player and simon entrys
  simonEntries = [];
  playerEntries = [];

  addSimonEntry();
}

function addSimonEntry(){
  //Change Game State to paused
  gameState = 1;

  //Change title
  $('#level-title').text("Simon Says...");

  //Add new entry to simon
  simonEntries.push(newSimonEntry());

  setTimeout(() => {
    $("#level-title").text("?");
    gameState = 2;
    playerEntries = [];
  }, (simonEntries.length + 1) * 500);

  //Loop through Simon entries to display sequence
  var counter = 0;
  delayAnimationButton(500, counter);
}

function delayAnimationButton(delay, counter){
  console.log("Counter value " + counter);
  setTimeout(() => {
    buttonAnimation(simonEntries[counter]);
    counter++;

    if(counter < simonEntries.length){
      delayAnimationButton(500, counter);
    };
  }, delay);
};

function newSimonEntry() {
  //Get a random number between 1-4
  var rand = Math.ceil(Math.random() * 4);
  console.log("random number is " + rand);

  //Return the corresponding colour
  switch (rand) {
    case 1:
      return "green";
    case 2:
      return "red";
    case 3:
      return "yellow";
    case 4:
      return "blue";
    default:
      console.log("error computing value");
  }
}

//Function to control button pressed animation
function buttonAnimation(colorId) {

  //reference to current button
  var button = $(".btn." + colorId)[0];

  button.classList.add("pressed");

  //Play correct sound depending on button pressed
  switch (colorId) {
    case "green":
      playAudio("green");
      break;

    case "red":
      playAudio("red");
      break;

    case "yellow":
      playAudio("yellow");
      break;

    case "blue":
      playAudio("blue");
      break;

    default:
      console.log("Button does not exist");
  }

  setTimeout(function() {
    button.classList.remove("pressed");
  }, 100);
}

//Function to check if player entry is correct
function checkSimon() {
  for(var i = 0; i < playerEntries.length; i++){
    if(playerEntries[i] === simonEntries[i]){
      console.log("correct answer");
    }
    else{
      console.log("player loses");
      gameOver();
      return null;
    }
  }

  //Player has correctly entered sequence
  if(playerEntries.length === simonEntries.length){
    gameState = 1;
    $("#level-title").text("Correct!");
    currentScore++;
    $("#current-score").text("Current Score: " + currentScore);
    setTimeout(() => {
      addSimonEntry();
    }, 2000);
  }
}

//Game over sequence when player answers incorectly
function gameOver() {
  $("#level-title").text("Doh! Press Any Key or Button to Play Again.");

  playAudio("wrong");

  //Flash the screen for a set amount of time
  var refreshIntervalId = setInterval(() => {
    $("body").toggleClass("game-over");
  }, 100)

  setTimeout(() => {
    clearInterval(refreshIntervalId);
    $("body").removeClass("game-over");
  }, 2000)

  //Set new hi score
  if(currentScore > hiScore){
    hiScore = currentScore;
    $("#high-score").text("High Score: " + hiScore);
  }

  currentScore = 0;
  $("#current-score").text("Current Score: " + currentScore);
  gameState = 0;
}

function playAudio(sound){
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}
