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
  
  background(40);
  push()
  fill(110)
  line(625,0,625,1200)
  rect(525,0,200,1200)
  pop()
  
  push()
  fill(255)
  rect(0,800,50,200)
  rect(100,800,50,200)
  rect(200,800,50,200)
  rect(300,800,50,200)
  rect(400,800,50,200)
  rect(500,800,25,200)
    
  rect(725,800,25,200)
  rect(800,800,50,200)
  rect(900,800,50,200)
  rect(1000,800,50,200)
  rect(1100,800,50,200)
  rect(1200,800,50,200)
  pop()
    
  push()
  fill(175,100,0)
  rect(250,0,30,100)
  rect(250,150,30,100)
  rect(250,300,30,100)
  rect(250,450,30,100)
  rect(250,600,30,100)
  rect(250,1050,30,100)
  
  rect(1000,0,30,100)
  rect(1000,150,30,100)
  rect(1000,300,30,100)
  rect(1000,450,30,100)
  rect(1000,600,30,100)
  rect(1000,1050,30,100)
  
  pop()
  
  circle(x1,900,100)
  circle(x2,900,100)
  
  push()
  fill(0,0,0)
  car1(x3,y,100)
  pop()
   
  push()
  car2(x3,y,100)
  pop()
    
  push()
  car3(x3,y,100)
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
    speed1 = -35
  }
  }else if(key == 'i'){
    if(x2 <= 675){
    speed2 = 35
  }
}
  if(y <= 200)
    speed3 = 20
}
  
  //  Key function is used to set player controls and jumping distance. Can be altered to see the distances!

function car1(x3,y){
  fill(200,20,0)
  rect(x3,y,100,200,20)
  fill(0)
  rect(x3-20,y+15,20,50,10)
  rect(x3-20,y+125,20,50,10)
  rect(x3+100,y+15,20,50,10)
  rect(x3+100,y+125,20,50,10)
  fill(200,200,0)
  ellipse(x3+15,y+180,20)
  ellipse(x3+85,y+180,20)
  fill(0,70,100)
  stroke(0)
  strokeWeight(4)
  rect(x3+10,y+30,80,50,10)
  rect(x3+10,y+100,80,50,10)
}
  
  function car2(x3,y){
  fill(20,200,200)
  rect(x3,y,100,200,20)
  fill(0)
  rect(x3-20,y+15,20,50,10)
  rect(x3-20,y+125,20,50,10)
  rect(x3+100,y+15,20,50,10)
  rect(x3+100,y+125,20,50,10)
  fill(200,200,0)
  ellipse(x3+15,y+180,20)
  ellipse(x3+85,y+180,20)
  fill(0,70,100)
  stroke(0)
  strokeWeight(4)
  rect(x3+10,y+30,80,50,10)
  rect(x3+10,y+100,80,50,10)
}
  
  function car3(x3,y){
  fill(20,200,200)
  rect(x3,y,100,200,20)
  fill(0)
  rect(x3-20,y+15,20,50,10)
  rect(x3-20,y+125,20,50,10)
  rect(x3+100,y+15,20,50,10)
  rect(x3+100,y+125,20,50,10)
  fill(200,200,0)
  ellipse(x3+15,y+180,20)
  ellipse(x3+85,y+180,20)
  fill(0,70,100)
  stroke(0)
  strokeWeight(4)
  rect(x3+10,y+30,80,50,10)
  rect(x3+10,y+100,80,50,10)
}
  
  