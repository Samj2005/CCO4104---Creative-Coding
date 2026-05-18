#EXPERIMENT 2 

For the second experiment, I chose to create a 1 key game for two players with a clear win condition. In my final update the game is called "MIRRORED COLLISION":

[Experiment 2 - Mirrored Collision](/EXPERIMENT 2/index.html)

For this mini gqame I wanted to design a fun side scroller with two players. However early into development, I found the horizontal layout was very reminicent of other games already. I wanted to invent something unique. Where I flipped the world to be vertical, where each player dodges on their side of the table to avoid the falling squares. 

A large portion of this was achieved by using an x variable for each of the players shapes and a speed variable to set the distance/speed those shapes jump at: 

```
let x1
let x2
let speed1
let speed2

```

So x1 correlates to player 1, and x2 responds to player 2. It sets the starting position the shape always returns to after it jumps with one key. 

```

let y
let x3
let speed3

```

I had also implemented the same variables for the object where it would fall to the bottom of the screen. When it passes the threshold of the screen border, it will randomly respawn horizontally. It needs the y value as it will be travelling vertically. 

```

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

```

The function here allows our shape to move. Earlier in the program we set the shapes x values to be at their starting position and the speed to be set at 0. Essentially the function checking two conditions with nested if statements. Checking if the shape is at their starting position and if that particular key is pressed.
If both are ture, the shapes speed value adds the pixel distance it moves before returning to its original position. 

```
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
```

To ensure our shapes reset to their positions, this if statement checks the shape does not fly forever. It says essentially unless the shape is less than its starting position reset it to starting position. So they form this nice little jump animation. 
For our object, itsa resetting it once it has left the boundary of the full window height of the screen. 

```
if(x1 + 50 > x3 && x1 - 50 < x3 + 100 && 900 + 50 > y && 900 - 50 < y + 100){
     gameOver = true
     winner = "PLAYER 2 WINS"
  }
    
  if(x2 + 50 > x3 && x2 - 50 < x3 + 100 && 900 + 50 > y && 900 - 50 < y + 100){
    gameOver = true
    winner = "PLAYER 1 WINS"
}

```

Finally, the last feature I had to implement was a collision detection. How I programmed this essentially was using a boolean statement for the game over that stays false as the game is running. The two if statements correlate to each player where it checks the condition that player 1s 
hoirzontal position overlaps with x3s horizontal position between the pixel co-ordinate ranges, it will et the boolean game over screen to true. We have to add on an extra 50 to each x value to allow the hit boxes of each of the objects. 

For the further experiments, I kind of wanted to gamify what I had created. 
