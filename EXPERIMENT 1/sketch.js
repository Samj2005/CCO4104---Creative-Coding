let title = "JUST A SQUARE"
let squareX = 600
let squareY = 500
let squareS = 100
let speed = 2
let squareColor
let border = 1
let backgroundColor

function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
 backgroundColor = color(50,50,50);
  
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
      squareColor = color(225,0,0);
    }
    else if(key == 'e'){
      border = border +1;
    }
    else if(key == 'q'){
      border = border - 1;
    }
    else if(key == 't'){
      
    }
  
}

background(backgroundColor)
     head()
  keyBoard()
  
push()
stroke(0)
strokeWeight(border)
square(squareX,squareY,squareS)
pop()
}

function head(){
  push()
  fill(255,135,0)
  strokeWeight(3)
  stroke(0)
  textSize(100)
  text(title,250,120)
  pop()
}

function keyBoard(){
  push()
  
  fill(0)
  rect(0,0,10,1000)
  rect(0,0,1400,10)
  rect(1395,0,10,1000)
  
  fill(255)
  stroke(0)
  strokeWeight(10)
  rect(0,760,1400,400)
  
  fill(255)
  stroke(0)
  strokeWeight(5)
  
  //row 1
  // 1-0
  
   square(45,775,70,10)
   square(120,775,70,10)
   square(195,775,70,10)
   square(270,775,70,10)  
   square(345,775,70,10)
   square(420,775,70,10)
   square(495,775,70,10)
   square(570,775,70,10)
   square(645,775,70,10)
   square(720,775,70,10)
  
  //row 2
  
  //q-p
   square(75,850,70,10)
   square(150,850,70,10)
   square(225,850,70,10)
   square(300,850,70,10)
   square(375,850,70,10)
   square(450,850,70,10)
   square(525,850,70,10)
   square(600,850,70,10)
   square(675,850,70,10)
   square(750,850,70,10)
  
  //shift
  square(5,1000,70,10)
  
  //row 3
  
  //a-l
  square(95,925,70,10)
  square(170,925,70,10)
  square(245,925,70,10)
  square(320,925,70,10)
  square(395,925,70,10)
  square(470,925,70,10)
  square(545,925,70,10)
  square(620,925,70,10)
  square(695,925,70,10)
  
  //row 4
  
  //z-m
  square(145,1000,70,10)
  square(220,1000,70,10)
  square(295,1000,70,10)
  square(370,1000,70,10)
  square(445,1000,70,10)
  square(520,1000,70,10)
  square(595,1000,70,10)
  square(670,1000,70,10)
  
  //arrow top
  square(1120,1000,70,10)
  
  //row 5
  //space bar
  rect(285,1075,500,70,10)
  
  //arrows
  square(1050,1075,70,10)
  square(1120,1075,70,10)
  square(1190,1075,70,10)
  
  pop()
  
  push()
  stroke(0)
  strokeWeight(3)
  textSize(30)
    text('w',175,890)
    text('s',195,965)
    text('a',120,965)
    text('d',270,970)
    text('e',250,890)
    text('q',100,890)
    text('U',1145,1050)
    text('D',1145,1120)
  
  pop()
}