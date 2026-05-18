let screen;
let squareX = 200
let squareY = 150
let squareS = 20
let speed = 2
let squareColor
let border = 1
let backgroundColor
let strokeColour

let message = "JUST A SQUARE"
let head = "How to play:"
let info1 = "Press the displayed keys below!"
let info2 = "+ Rfers to the top arrow. - Refers to the bottom arrow. "


function setup() {
  createCanvas(windowWidth, windowHeight);
  screen = color(0,0,0,10);
}

function draw(){
  //background(0);
  controlPanel()
  guide()
  backgroundColor = color(50,50,50,5);
  strokeColour = color(0)
  squareColor = color(255)
  
  if(keyIsPressed){
    if(key == '(blank space)'){
      square(squareX,squareY,squareS);
  }
    else if(key == 'w'){
      squareY = squareY - speed;
  }
    else if(key == 's'){
      squareY = squareY + speed;
  }
    else if(key == 'a'){
      squareX = squareX - speed;
  }
    else if(key == 'd'){
      squareX = squareX + speed;
  }
    else if(key == 'ArrowUp'){
      squareS = squareS + 1
    }
    else if(key == 'ArrowDown'){
      squareS = squareS - 1
    }
    else if(key == 'r'){
      strokeColor = color(150,150,0);
    }
    else if(key == 'e'){
      border = border +1;
    }
    else if(key == 'q'){
      border = border - 1;
    }
    else if(key == 't'){
      backgroundColor = color(255)
    }
    else if(key == 'i'){
       square = color(220,50,50)
      
    }
  
  
  
}
background(backgroundColor)
push()
stroke(200,150,0)
strokeWeight(border)
fill(160,32,240)
square(squareX,squareY,squareS)
pop()
  
  if(squareX > 373){
    squareX = 373
  }else if(squareX < 50){
    squareX = 50
  }else if(squareY < 50){
    squareY = 50
  }else if(squareY > 220){
    squareY = 220
  }


}
    
  
  


function controlPanel(){
    fill(200,50,50)
  rect(20,20,400,475,20)
    fill(20)
  square(45,350,50)
  square(95,300,50)
  square(145,350,50)
  square(95,400,50)
  
  fill(100,100,0,150)
  circle(350,300,40)
  fill(0,0,100,150)
  circle(350,400,40)
  fill(0,100,0,150)
  circle(300,350,40)
  fill(100,0,0,150)
  circle(300,450,40)
  
  fill(220)
  textSize(20)
  text("S", 112.5, 417.5, 80)
  text("A", 62.5,367.5,30)
  text("D", 162.5, 367.5,30)
  text("W", 110.5, 317.5,30)
  text("E",344.5,290,40)
  text("Q",294.5,342.5,40)
  text("+",344.5,392.5,40)
  text("-",294.5,442.5,40 )
   fill(25)
  rect(45,45,350,200,20)
}

  function screenOne(){
  noFill()
  rect(55,57,325,175,10)
}

function guide(){
  fill(0,70,0)
  rect(450,0,300,500,20)
  fill(255,135,0)
  line(460,50,600,50)
  textSize(30)
  stroke(0)
  strokeWeight(3)
  text(message,460,40)
  
  fill(220)
  textSize(20)
  stroke(0)
  strokeWeight(2)
  text(head,460,80)
  
  fill(220)
  textSize(15)
  stroke(0)
  strokeWeight(2)
  text(info1,460,120)
  text(info2,460,140,220)  


}


