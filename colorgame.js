var numSquares = 6;
var backgroundColor = '#222';
var colors = [];
var pickedColor;
var overlay = document.getElementById('overlay');
var play = document.querySelector('.play');
var h1 = document.querySelector('h1');
var hint = document.querySelector('.hint');
var hintImg = document.querySelector('.hintImg');
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.getElementById('message');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');


play.addEventListener('click', () => {
    overlay.style.transform = "translateY(-100%)";
    init();
});


function init(){
  //modeButtons event listeners
  for( var i = 0; i<modeButtons.length; i++){
    modeButtons[i].addEventListener('click', function() {
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent === 'Easy' ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
  for(var i = 0; i < squares.length; i++){
    //add click listener to all squares
    squares[i].addEventListener('click', function(){
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //coimpare color clicked to pickedColor
      if(clickedColor === pickedColor){
        messageDisplay.textContent = 'Correct!';
        resetButton.textContent = 'Play Again?';
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = 'white';
        messageDisplay.textContent = "Try Again";
      }
    });
  }
  reset();
}

hint.addEventListener('click', function(){
  if(this.checked){
    hintImg.style.opacity = 1;
  } else {
    hintImg.style.opacity = 0;
  }
});


function reset(){
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match pickedColor
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = 'New Colors';
  messageDisplay.textContent = '';
  //change colors of squares
  for(var i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  h1.style.backgroundColor = backgroundColor;
}


resetButton.addEventListener('click', function(){
  reset();
})

colorDisplay.textContent = pickedColor;



function changeColors(color){
  //loop through all squares
  for(var i=0; i < squares.length; i++){
    //change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}
function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num){
  //make array
  var arr = [];
  //add num random colors to array
  for(var i = 0; i < num; i++){
    //get random color and push to array
    arr.push(randomColor());
  }
  // return that array
  return arr;
}

function randomColor(){
  //pick a 'red', 'green', and 'blue' from 0 to 255
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
