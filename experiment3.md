#EXPERIMENT 3 

For the final experiemnt, I wanted to create a uniue physic engine for a user with my partnership AI using CHATGPT. Below I have documented the prompts and changes for what we have creatively made together in this project: 

prompt: cant you just make the use of physics using classes in p5 without the use of matter js?

response code:

```

class PhysicsObject {
  constructor(x, y, r, type) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.r = r;
    this.type = type;
    this.dragging = false;

    // Different behaviours
    if (type === "basketball") {
      this.bounce = 0.9;
      this.mass = 1;
    } else if (type === "balloon") {
      this.bounce = 0.6;
      this.mass = 0.2;
    } else if (type === "hammer") {
      this.bounce = 0.2;
      this.mass = 3;
    } else if (type === "teddy") {
      this.bounce = 0.4;
      this.mass = 1.5;
    }
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    if (!this.dragging) {
      // gravity
      this.applyForce(createVector(0, 0.3 * this.mass));

      // balloon floats upward slightly
      if (this.type === "balloon") {
        this.applyForce(createVector(0, -0.4));
      }

      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    this.checkEdges();
  }

  checkEdges() {
    // Floor
    if (this.pos.y + this.r > height) {
      this.pos.y = height - this.r;
      this.vel.y *= -this.bounce;
    }

    // Ceiling
    if (this.pos.y - this.r < 0) {
      this.pos.y = this.r;
      this.vel.y *= -this.bounce;
    }

    // Walls
    if (this.pos.x + this.r > width) {
      this.pos.x = width - this.r;
      this.vel.x *= -this.bounce;
    }

    if (this.pos.x - this.r < 0) {
      this.pos.x = this.r;
      this.vel.x *= -this.bounce;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);

    noStroke();

    if (this.type === "basketball") {
      fill(255, 140, 0);
      ellipse(0, 0, this.r * 2);
    } else if (this.type === "balloon") {
      fill(255, 100, 150);
      ellipse(0, 0, this.r * 2);
      stroke(0);
      line(0, this.r, 0, this.r + 20);
    } else if (this.type === "hammer") {
      fill(100);
      rectMode(CENTER);
      rect(0, 0, this.r * 2, this.r);
    } else if (this.type === "teddy") {
      fill(150, 100, 50);
      ellipse(0, 0, this.r * 2);
    }

    pop();
  }

  // Mouse interaction
  pressed(mx, my) {
    let d = dist(mx, my, this.pos.x, this.pos.y);
    if (d < this.r) {
      this.dragging = true;
    }
  }

  released() {
    this.dragging = false;
  }

  drag(mx, my) {
    if (this.dragging) {
      this.pos.set(mx, my);
      this.vel.set(0, 0);
    }
  }
}

// --- Main sketch ---
let objects = [];

function setup() {
  createCanvas(800, 600);

  objects.push(new PhysicsObject(200, 100, 25, "basketball"));
  objects.push(new PhysicsObject(400, 100, 30, "balloon"));
  objects.push(new PhysicsObject(600, 100, 35, "hammer"));
  objects.push(new PhysicsObject(300, 200, 30, "teddy"));
}

function draw() {
  background(255);

  for (let obj of objects) {
    obj.update();
    obj.display();
  }

  // basic object collision
  handleCollisions();
}

function mousePressed() {
  for (let obj of objects) {
    obj.pressed(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (let obj of objects) {
    obj.released();
  }
}

function mouseDragged() {
  for (let obj of objects) {
    obj.drag(mouseX, mouseY);
  }
}

// Simple collision system
function handleCollisions() {
  for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      let a = objects[i];
      let b = objects[j];

      let d = dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
      let minDist = a.r + b.r;

      if (d < minDist) {
        let overlap = minDist - d;
        let dir = p5.Vector.sub(b.pos, a.pos).normalize();

        b.pos.add(dir.copy().mult(overlap / 2));
        a.pos.sub(dir.copy().mult(overlap / 2));

        // simple velocity swap
        let temp = a.vel.copy();
        a.vel = b.vel.copy();
        b.vel = temp;
      }
    }
  }
}

```

FINAL VERSION : [Experiment 3](/EXPERIMENT 3/index.html)

The main changes I made to this initial response was reprogramming the assets the AI had used to create a more engaging experience. Where I duplicated the soft physics of the teddy bear asset to make this ballpit the user can interact with. The other objects too can be pushed into it and based on their properties they all interact differently. 
The original version was just quite bland in aesthetics so I added stroke to make the objects seem more interactable whilst keeping the simple feel of a physics engine. 


However this project gave me inspiration for the further experiment of this version. To add a level of water physics into the mix, as the ball pit reminded me alot of how water flows for example. 

Further experiment original prompt: Could I ask for a further development to make this even more playful. I would like to implement a very different kind of physical behaviour in this program using already what we have established. Would it be possible to add water to the simulator and see how it affects the objects? Im thinking of a simple wave system if its possible to do so in p5?

Response: 

```
class Water {
  constructor(y) {
    this.y = y; // water level
    this.waveOffset = 0;
  }

  update() {
    this.waveOffset += 0.05;
  }

  getSurface(x) {
    // simple sine wave
    return this.y + sin(x * 0.02 + this.waveOffset) * 10;
  }

  display() {
    noStroke();
    fill(100, 150, 255, 150);

    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let y = this.getSurface(x);
      vertex(x, y);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}

```

With this response, AI uses vertexs and the constrcutor tool to create with waving shape that expands and returns to its original shape like a soundwave on repeat. It also implements each wave moving with the shapes depending on their weight and mass utilising classes to add the velocity of the waves. The chnages I made to this initial response is again I wanted to make it playful. I once again duplicated the object class so more balls would spawn where the program turns into this fun ball pit on the sea physic engine. Where the other 3 objects can move it in fun and interesting ways. I also expanded the window width and added some extra scenery to make the enitre program just pop entirely. 

However, I still wanted to find ways to make this even more playful. My next ideas were to implement moving fish into the water using AI and bubbles to make all these behaviours change whilst making the AI visually appealing: 

Prompt: This is the current code I have improved upon, Now I want to make this even more crazy. Could you program a bunch of fish that swim back and forth off this code and add it in. The objects can interact with it too. And maybe some bubbles too? could you add the whole block of code together as one pice?

Response: 

```

// =======================
// WATER CLASS
// =======================
class Water {
  constructor(y) {
    this.y = y;
    this.waveOffset = 0;
  }

  update() {
    this.waveOffset += 0.1;
  }

  getSurface(x) {
    return this.y + sin(x * 0.02 + this.waveOffset) * 10;
  }

  display() {
    strokeWeight(3);
    stroke(0);
    fill(0, 175, 255, 150);

    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let y = this.getSurface(x);
      vertex(x, y);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}

// =======================
// PHYSICS OBJECT CLASS
// =======================
class PhysicsObject {
  constructor(x, y, r, type) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.r = r;
    this.type = type;
    this.dragging = false;

    if (type === "basketball") {
      this.bounce = 0.9;
      this.mass = 1;
    } else if (type === "balloon") {
      this.bounce = 0.6;
      this.mass = 0.4;
    } else if (type === "hammer") {
      this.bounce = 0.1;
      this.mass = 100;
    } else if (type === "teddy") {
      this.bounce = 0.4;
      this.mass = 1.5;
    }
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    if (!this.dragging) {

      // gravity
      this.applyForce(createVector(0, 0.3 * this.mass));

      // balloon lift
      if (this.type === "balloon") {
        this.applyForce(createVector(0, -0.4));
      }

      // water interaction
      let surface = water.getSurface(this.pos.x);

      if (this.pos.y + this.r > surface) {
        let depth = (this.pos.y + this.r) - surface;

        let buoyancy = map(depth, 0, this.r * 2, 0, -0.6);
        this.applyForce(createVector(0, buoyancy));

        this.vel.mult(0.9);
      }

      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    this.checkEdges();
  }

  checkEdges() {
    if (this.pos.y + this.r > height) {
      this.pos.y = height - this.r;
      this.vel.y *= -this.bounce;
    }

    if (this.pos.y - this.r < 0) {
      this.pos.y = this.r;
      this.vel.y *= -this.bounce;
    }

    if (this.pos.x + this.r > width) {
      this.pos.x = width - this.r;
      this.vel.x *= -this.bounce;
    }

    if (this.pos.x - this.r < 0) {
      this.pos.x = this.r;
      this.vel.x *= -this.bounce;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);

    noStroke();

    if (this.type === "basketball") {
      fill(255, 140, 0);
      ellipse(0, 0, this.r * 2);
    } else if (this.type === "balloon") {
      fill(255, 100, 150);
      ellipse(0, 0, this.r * 2);
      stroke(0);
      line(0, this.r, 0, this.r + 20);
    } else if (this.type === "hammer") {
      fill(100);
      rectMode(CENTER);
      rect(0, 0, this.r * 2, this.r);
    } else if (this.type === "teddy") {
      fill(150, 100, 50);
      ellipse(0, 0, this.r * 2);
    }

    pop();
  }

  pressed(mx, my) {
    let d = dist(mx, my, this.pos.x, this.pos.y);
    if (d < this.r) this.dragging = true;
  }

  released() {
    this.dragging = false;
  }

  drag(mx, my) {
    if (this.dragging) {
      this.pos.set(mx, my);
      this.vel.set(0, 0);
    }
  }
}

// =======================
// FISH CLASS
// =======================
class Fish {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(1, 2), 0);
    this.size = random(20, 40);
  }

  update() {
    this.pos.x += this.vel.x;

    this.pos.y += sin(frameCount * 0.05 + this.pos.x * 0.01) * 0.5;

    if (this.pos.x > width + 50) this.pos.x = -50;
    if (this.pos.x < -50) this.pos.x = width + 50;

    for (let obj of objects) {
      let d = dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y);
      if (d < this.size) {
        let push = p5.Vector.sub(obj.pos, this.pos).normalize();
        obj.applyForce(push.mult(0.2));
      }
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);

    fill(255, 200, 100);
    noStroke();

    ellipse(0, 0, this.size, this.size * 0.6);

    triangle(
      -this.size / 2, 0,
      -this.size / 2 - 10, -5,
      -this.size / 2 - 10, 5
    );

    pop();
  }
}

// =======================
// BUBBLE CLASS
// =======================
class Bubble {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-0.2, 0.2), random(-1, -2));
    this.size = random(5, 15);
  }

  update() {
    this.pos.add(this.vel);
    this.pos.x += sin(frameCount * 0.1 + this.pos.y) * 0.3;

    for (let obj of objects) {
      let d = dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y);
      if (d < obj.r) {
        obj.vel.y -= 0.05;
      }
    }
  }

  display() {
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  offscreen() {
    return this.pos.y < -20;
  }
}

// =======================
// GLOBALS
// =======================
let objects = [];
let fish = [];
let bubbles = [];
let water;

// =======================
// SETUP
// =======================
function setup() {
  createCanvas(windowWidth, windowHeight);

  water = new Water(height * 0.5);

  objects.push(new PhysicsObject(200, 100, 25, "basketball"));
  objects.push(new PhysicsObject(400, 100, 30, "balloon"));
  objects.push(new PhysicsObject(600, 100, 35, "hammer"));
  objects.push(new PhysicsObject(300, 200, 30, "teddy"));

  for (let i = 0; i < 8; i++) {
    fish.push(new Fish(random(width), random(height * 0.3, height * 0.7)));
  }
}

// =======================
// DRAW
// =======================
function draw() {
  background(0, 150, 200);

  // sun
  fill(255, 255, 0);
  circle(100, 100, 200);

  water.update();
  water.display();

  for (let obj of objects) {
    obj.update();
    obj.display();
  }

  for (let f of fish) {
    f.update();
    f.display();
  }

  if (frameCount % 10 === 0) {
    bubbles.push(new Bubble(random(width), height - 50));
  }

  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();

    if (bubbles[i].offscreen()) {
      bubbles.splice(i, 1);
    }
  }

  handleCollisions();
}

// =======================
// COLLISIONS
// =======================
function handleCollisions() {
  for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      let a = objects[i];
      let b = objects[j];

      let d = dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
      let minDist = a.r + b.r;

      if (d < minDist) {
        let overlap = minDist - d;
        let dir = p5.Vector.sub(b.pos, a.pos).normalize();

        b.pos.add(dir.copy().mult(overlap / 2));
        a.pos.sub(dir.copy().mult(overlap / 2));

        let temp = a.vel.copy();
        a.vel = b.vel.copy();
        b.vel = temp;
      }
    }
  }
}

// =======================
// MOUSE
// =======================
function mousePressed() {
  for (let obj of objects) obj.pressed(mouseX, mouseY);
}

function mouseReleased() {
  for (let obj of objects) obj.released();
}

function mouseDragged() {
  for (let obj of objects) obj.drag(mouseX, mouseY);
}

```

In the initial response, the fishes physics was extremley buggy where I had to improve it directly and the fish and bubbles also appeared over the water. By adjusting the fishes random spawn vector using the waves co-ordinates, the fish now stay below the waves and do not pass above it in their hoizontal movements. 
I improved the collision mechnaics by increasing the collision range of each object which makes the fishes able to bump and interact with the floating balls once more. I also added more objects using the soft physics to make the whole experience pop. And it is now extremley playful: 




