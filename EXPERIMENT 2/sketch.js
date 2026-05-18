//MIRROR COLLISION:

//HOW TO PLAY:
//Player 1 uses the 'W' key to jump and dodge the oncoming squares
//Player 2 uses the 'I' key to dodge the tiles
// You must dodge the tiles, first person to hit one loses!


let x1
let x2
let speed1
let speed2

//Variables for player 1 + 2s movementof the circle. Compared to the tutorial, I wanted the circles to kove horizontally instead of 
//vertically so it fits the screen better for two players instead of a side scroller. Speed is the value we will use to determine how many pixels our objects will jump at a time

let y
let x3
let speed3

//Variables for the object the players will avoid. Since the object falls vertically we will be using a 'Y' value. The horizontal value will be to store the squares random position after each time it falls.

let gameOver = false
let winner = ""

function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = 575
  x2 = 675
  x3 = random(width)
  speed1 = 0
  speed2 = 0
  speed3 = 0
  y = -100
}

//sets variable values for player 1 + 2 and the object. The values are each of the players starting positions. The objects is random so every time it falls it will randomly generate elsewhwere at the same height level.

function draw() {
  
  if(gameOver){

  textAlign(CENTER)
  textSize(80)
  fill(0)

  text(winner, width/2, height/2)

  return
}
  
// IF statement for our game over screen. Our gameover variable is set to false currently so when it is called true it will print out the following text onto the screen to announce which player has won. 
  
  x1 = x1 + speed1
  x2 = x2 + speed2
  y = y + speed3
    
//Takes the positions and moves it by the amount of pixels set later in our if statements. 
  
  background(220);
  line(625,0,625,1200)
  
  circle(x1,900,100)
  circle(x2,900,100)
  
  push()
  fill(0,0,0)
  square(x3,y,100)
  pop()
    
//SETS DIMENSIONS OF OUR OBJECT, push and pop is used so only the square is coloured black. 
  
  push()
  if(x1 < 575){
    speed1 = speed1 + 1}
else{
    speed1 = 0 
    x1 = 575
  }
  pop()
  
  push()
  
  if(x2 > 675){
    speed2 = speed2 - 1}
  else{
    speed2 = 0
    x2 = 675
  }
  pop()
  
  if(y > height){
    y = -100
    x3 = random(width)
  }
    
//These if statements essentially bring our shapes back to their starting positions, once they reach a certain pixel threshhold they will move back to their original places. This is to stop them endlessly falling for the players. However for our squares, we do not set a direct reset position. More if the square reaches past the perimeter of the bottom of the screen, it randomly respawns along the top axis. 
    
  if(x1 + 50 > x3 && x1 - 50 < x3 + 100 && 900 + 50 > y && 900 - 50 < y + 100){
     gameOver = true
     winner = "PLAYER 2 WINS"
  }
    
  if(x2 + 50 > x3 && x2 - 50 < x3 + 100 && 900 + 50 > y && 900 - 50 < y + 100){
    gameOver = true
    winner = "PLAYER 1 WINS"
}
    
// If statements set the condition if our players speed co-ordinates clash in the path of the falling squares, the program will set the game over boolean statement to announce the winner.     
}

function keyPressed(){
  if(key == 'w'){
  if(x1 <= 575){
    speed1 = -30
  }
  }else if(key == 'i'){
    if(x2 <= 675){
    speed2 = 30
  }
}
  if(y <= 200)
    speed3 = 20
}
  
  //  Key function is used to set player controls and jumping distance. Can be altered to see the distances!

