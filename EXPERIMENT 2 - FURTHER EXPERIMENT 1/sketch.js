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

let y1
let y2
let x3
let x4
let speed3

//Variables for the object the players will avoid. Since the object falls vertically we will be using a 'Y' value. The horizontal value will be to store the squares random position after each time it falls.

let gameOver = false
let winner = ""

function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = 575
  x2 = 675
  x3 = random(width)
  x4 = random(width)
  speed1 = 0
  speed2 = 0
  speed3 = 10
  y1 = -100
  y2 = 1100
}

//sets variable values for player 1 + 2 and the object. The values are each of the players starting positions. The objects is random so every time it falls it will randomly generate elsewhwere at the same height level.

function draw() {
  
  if(gameOver){

  textAlign(CENTER)
  textSize(80)
  fill(70,70,0)
  stroke(255)
  strokeWeight(3)
    

  text(winner, width/2, height/2)

  return
}
  
// IF statement for our game over screen. Our gameover variable is set to false currently so when it is called true it will print out the following text onto the screen to announce which player has won. 
  
  x1 = x1 + speed1
  x2 = x2 + speed2
  y1 = y1 + speed3
  y2 = y2 - speed3
    
//Takes the positions and moves it by the amount of pixels set later in our if statements. 
  
  background(40,120);
    
  push()
  strokeWeight(3)
  stroke(255)
  fill(255)
  line(625,0,625,1200)
  pop()
  
  push()
  stroke(255)
  strokeWeight(5)
  fill(0,40,150)
  circle(x1,750,100)
  pop()
    
  push()
  stroke(255)
  strokeWeight(5)
  fill(150,0,0)
  circle(x2,750,100)
  pop()
  
  push()
  fill(50,0,0)
  strokeWeight(5)
  stroke(200,10,20.)
  square(x3,y1,50)
  square(x4,y2,50)
  rect(0,0,1300,200)
  rect(0,1100,1300,200)
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
  
  if(y1 > height){
  y1 = -100
  x3 = random(width)
}

if(y2 < -100){
  y2 = height + 100
  x4 = random(width)
}
    
//These if statements essentially bring our shapes back to their starting positions, once they reach a certain pixel threshhold they will move back to their original places. This is to stop them endlessly falling for the players. However for our squares, we do not set a direct reset position. More if the square reaches past the perimeter of the bottom of the screen, it randomly respawns along the top axis. 
    
  if(x1 + 50 > x3 && x1 - 50 < x3 + 100 && 750 + 50 > y1 && 700 - 50 < y1 + 100){
     gameOver = true
     winner = "PLAYER 2 WINS"
  }
    
  if(x2 + 50 > x3 && x2 - 50 < x3 + 100 && 750 + 50 > y1 && 700 - 50 < y1 + 100){
    gameOver = true
    winner = "PLAYER 1 WINS"
}
    
  if( x1 + 50 > x4 && x1 - 50 < x4 + 50 && 750 + 50 > y2 && 700 - 50 < y2 + 50
){
  gameOver = true
  winner = "PLAYER 2 WINS"
}
    
  if(x2 + 50 > x4 && x2 - 50 < x4 + 50 && 750 + 50 > y2 && 700 - 50 < y2 + 50
){
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
}
 
  
  
  //  Key function is used to set player controls and jumping distance. Can be altered to see the distances!

