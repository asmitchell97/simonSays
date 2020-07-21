//Variable to determine the game state, game begin (0), game paused (1) game playing (2)
var gameState = 0;

//Arrays to contain simon entrys and player entrys
var simonEntries = [];
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

  switch (gameState) {
    case 0:

      break;
    case 1:

      break;
    case 2:
      //Get reference to the id of button clicked
      var colorId = e.currentTarget.id;
      buttonAnimation(colorId);

      //Check against the simonEntries to see if correct
      

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
  playerEntry = [];

  addSimonEntry();
}

function addSimonEntry(){
  //Change Game State to paused
  gameState = 1;

  //Change title
  $('#level-title').text("Simon Says...");

  //Add new entry to simon
  simonEntries.push(newSimonEntry());

  //Loop through Simon entries to display sequence
  simonEntries.forEach(item => {
    buttonAnimation(item);
  })

  gameState = 2;

}

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
  console.log(button);

  button.classList.add("pressed");

  //Play correct sound depending on button pressed
  switch (colorId) {
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
