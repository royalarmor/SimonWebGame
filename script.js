var buttonColors = ["red" , "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var userLost = false;
var level = 1;
var score;
var userName;

// sweetAlert 2 code

Swal.fire({
  title: "Please, enter your name",
  content: "input",
  input: 'text',
  background: '#011F3F',
  color:  '#FEF2BF',
  confirmButtonText: 'SEND',
  confirmButtonColor: '#011F3F',
})
.then((value) => {
  userName = (value.value);
  Swal.fire({
    icon:'success',
    iconColor:'#FEF2BF',
    title: 'Name saved',
    color:  '#FEF2BF',
    background: '#011F3F',
    showConfirmButton: false,
    timer: 2000,

  });
});



$(".btn").click(function() {
 var userChosenColor = $(this).attr("id");
 userClickedPattern.push(userChosenColor);
 userInput(userClickedPattern.length-1);
 playSound(userChosenColor);
 animatePress(userChosenColor);
})

$("body").keydown(function (){

  if(!started){
    started = true;
    nextSequence();
  }
});


function animatePress (color) {
  if(started === true) {
  $("#" + color).addClass("pressed");

  setTimeout(function(){
    $("#" + color).removeClass("pressed");
  },100)
}
}


function playSound (name) {
if(started === true) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}
}


function nextSequence () {
userClickedPattern = [];
$("#level-title").text("Level " + level);
level++;
var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$("#" + randomChosenColor).fadeIn(300).fadeOut(200).fadeIn(200)
playSound(randomChosenColor);
}


function userInput (uI) {
  if (gamePattern[uI] === userClickedPattern[uI]) {

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else if (userClickedPattern !== gamePattern && started === true) {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },300);
    playSound("wrong");
    $("#level-title").text("Game over, press any key to restart");
    startOver();
    }
}

function startOver () {
  score = level -2;
  level = 1;
  started = false;
  gamePattern = [];
  Swal.fire({
  title: userName + ',  your score was ' + score,
  icon: 'info',
  iconColor: '#FEF2BF',
  color:  '#FEF2BF',
  background: '#011F3F',
  showConfirmButton: false,
  timer: 3500,
})
}
