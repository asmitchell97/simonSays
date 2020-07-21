//Variable to determine the game state, game begin (0), game paused (1) game playing (2)
var gameState = 0;

//Arrays to contain simon entrys and player entrys
var simonEntry = [];
var playerEntry = [];

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
  console.log(e);
  buttonAnimation(e);
});

//Start a new Game
function newGame(){
  //Game state paused
  gameState = 1;

  //Reset player and simon entrys
  simonEntry = [];
  playerEntry = [];

  addSimonEntry();
}

function addSimonEntry(){
  //Change Game State to paused
  gameState = 1;

  //Change title
  $('#level-title').text("Simon Says...");

  

}

//Function to control button pressed animation
function buttonAnimation(event) {

  //reference to current button
  var button = event.currentTarget;
  console.log(button);

  button.classList.add("pressed");

  //Play correct sound depending on button pressed
  switch (button.id) {
    case "green":
      var greenAudio = new Audio("sounds/green.mp3");
      greenAudio.play();
      break;

    case "red":
      var redAudio = new Audio("sounds/red.mp3");
      redAudio.play();
      break;

    case "yellow":
      var yellowAudio = new Audio("sounds/yellow.mp3");
      yellowAudio.play();
      break;

    case "blue":
      var blueAudio = new Audio("sounds/blue.mp3");
      blueAudio.play();
      break;

    default:
      console.log("Button does not exist");
  }

  setTimeout(function() {
    button.classList.remove("pressed");
  }, 100);
}
