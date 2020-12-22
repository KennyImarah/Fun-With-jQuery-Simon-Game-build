//alert("It is up");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;    //level variable.
var started = false;   //Started variable.

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {
    //Update level-title id text "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//add click listener to btn class
$(".btn").click(function() {
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);  // push userChosenColour into userClickedPattern array

 playSound(userChosenColour);   //call playSound() with userChosenColour value
 animatePress(userChosenColour);

//Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer
checkAnswer(userClickedPattern.length-1);  //checkAnswer function with userClickedPattern.length argument
      });

function checkAnswer(currentLevel) {  //checkAnswer function with currentLevel parameter
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.console.log("success");
//check that they have finished their sequence with another if statement.
        if(userClickedPattern.length === gamePattern.length){
          setTimeout(function(){     //Call nextSequence() after a 1000 millisecond delay
            nextSequence();}, 1000);
        }
      } else {

          playSound("wrong");  // play "wrong" sound
          console.log("wrong");
          $("body").addClass("game-over");
          setTimeout(function(){
          $("body").removeClass("game-over");
      }, 200);

    //  $("#level-title").text("Game Over, Press Any Key to Restart");


      startOver(); // call method if User gets answer wrong
    }
  }

function nextSequence(){
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//var sound = new Audio("sounds/" + randomChosenColour + ".mp3");

playSound(randomChosenColour);
}

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
setTimeout(function(){
  $("#" + currentColour).removeClass("pressed");
}, 200);

}

function startOver() {
level = 0;
gamePattern = [];
started = false;
}
