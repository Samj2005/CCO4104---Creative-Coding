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
