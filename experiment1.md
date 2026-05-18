# Experiment 1

For my first experiment, I wanted to design a fun control panel that takes a simple shape and alters it using different key inputs. My original ideas saw me utilising a gameboy interface which was then replaced by a larger keyboard interface so the user knows which key to press.
The idea here being each key alters something to the square to make it interesting: 

[link to experiment1](/EXPERIMENT 1/index.html)

I had managed to achieve these playful behaviours by setting variables for the squares properties before adding a value to those properties:

```

let squareX = 600
let squareY = 500
let squareS = 100
let speed = 2
let squareColor
let border = 1

```

Once I had set the variables, I used p5's built in keyIsPressed function to set each keyboard input for these properties to be altered. This allows for the keyboard to essentially await these commands where it will constantly run the action frame after frame. 

```

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
  ```

As seen here, many of the properties gets altered over time. The main variable I used was speed which states how many pixels the square grows/shrinks by  for example. Or how much the X,Y values move when pressed. 

This simple code allowed me to be extremley playful when developing my further experiments. And idea I wanted to test was to condense the interface down to a gameboy like screen as presented in my earlier ideas. The results can be seen below:

[Further Experiment 1](/EXPERIMENT 1 - FURTHER EXPERIMENT 1/index.html)

This was created by drawing a combination of shapes to create a fun interface for the user. 

The final experiment I had created took things to a new level. Using the same interface as before and using similar keyboard commands where I wanted to implement further fun features for the control panel. The idea here was to create a drawing tool in a sense. Where I had removed the background to allow the square to leave a pattern and change colors: 

[Further Experiment 2](/EXPERIMENT 1 - FURTHER EXPERIMENT 2/index.html)


