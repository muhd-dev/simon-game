
// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store game pattern and user clicked pattern
var gamePattern = [];
var userClickedPattern = [];

// Variables to manage game state
var started = false;
var level = 0;

// Event listener for key press to start the game
$(document).keypress(function() {
  if (!started) {
    // Display current level
    $("#level-title").text("Level " + level);
    // Start the game sequence
    nextSequence();
    started = true;
  }
});

// Event listener for button click
$(".btn").click(function() {
  // Get the color of the clicked button
  var userChosenColour = $(this).attr("id");
  // Store the user's choice in the pattern
  userClickedPattern.push(userChosenColour);

  // Play sound and animate button press
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check the user's answer
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      // If the user pattern matches the game pattern, move to the next level
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // If the user's answer is wrong
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Remove the "game-over" class after a delay
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Restart the game
    startOver();
  }
}

// Function to generate the next sequence
function nextSequence() {
  // Reset the user clicked pattern
  userClickedPattern = [];
  // Increment the level and display it
  level++;
  $("#level-title").text("Level " + level);
  
  // Generate a random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  // Add the random color to the game pattern
  gamePattern.push(randomChosenColour);

  // Animate the button with the chosen color
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// Function to animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to start over the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}