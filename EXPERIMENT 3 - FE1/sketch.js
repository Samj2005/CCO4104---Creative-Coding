


// =======================
// WATER CLASS
// =======================
class Water {
  constructor(y) {
    this.y = y;
    this.waveOffset = 0;
  }

  update() {
    this.waveOffset += 0.10;
  }

  getSurface(x) {
    return this.y + sin(x * 0.04 + this.waveOffset) * 40;
  }

  display() {
    strokeWeight(3)
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

    // Behaviour differences
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
      // Gravity
      this.applyForce(createVector(0, 0.3 * this.mass));

      // Balloon floats slightly
      if (this.type === "balloon") {
        this.applyForce(createVector(0, -0.4));
      }

      // =======================
      // 🌊 WATER INTERACTION
      // =======================
      let surface = water.getSurface(this.pos.x);

      if (this.pos.y + this.r > surface) {
        // Depth inside water
        let depth = (this.pos.y + this.r) - surface;

        // Buoyancy (push upward)
        let buoyancy = map(depth, 0, this.r * 2, 0, -0.6);
        this.applyForce(createVector(0, buoyancy));

        // Drag (slow movement)
        this.vel.mult(0.9);
      }

      // Movement
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

    stroke(0);
    strokeWeight(3)

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
      fill(150, 0, 50);
      ellipse(0, 0, this.r * 2);
      
    }

    pop();
  }

  // =======================
  // MOUSE INTERACTION
  // =======================
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

// =======================
// MAIN SKETCH
// =======================
let objects = [];
let water;

function setup() {
  createCanvas(windowWidth, windowHeight);

  water = new Water(350);
  strokeWeight(3)
  stroke(0)
  objects.push(new PhysicsObject(200, 100, 75, "basketball"));
  objects.push(new PhysicsObject(400, 100, 30, "balloon"));
  objects.push(new PhysicsObject(600, 100, 35, "hammer"));
  
  objects.push(new PhysicsObject(300, 200, 30, "teddy"));
  objects.push(new PhysicsObject(300, 200, 30, "teddy"));
  objects.push(new PhysicsObject(400, 200, 30, "teddy"));
  objects.push(new PhysicsObject(500, 200, 30, "teddy"));
  objects.push(new PhysicsObject(600, 200, 30, "teddy"));
  objects.push(new PhysicsObject(700, 200, 30, "teddy"));
  objects.push(new PhysicsObject(800, 200, 30, "teddy"));
  objects.push(new PhysicsObject(100, 200, 30, "teddy"));
  objects.push(new PhysicsObject(200, 200, 30, "teddy"));
  objects.push(new PhysicsObject(250, 200, 30, "teddy"));
  objects.push(new PhysicsObject(350, 200, 30, "teddy"));
  objects.push(new PhysicsObject(450, 200, 30, "teddy"));
  objects.push(new PhysicsObject(550, 200, 30, "teddy"));
  objects.push(new PhysicsObject(650, 200, 30, "teddy"));
  objects.push(new PhysicsObject(300, 200, 30, "teddy"));
  objects.push(new PhysicsObject(400, 200, 30, "teddy"));
  objects.push(new PhysicsObject(500, 200, 30, "teddy"));
  objects.push(new PhysicsObject(600, 200, 30, "teddy"));
  objects.push(new PhysicsObject(700, 200, 30, "teddy"));
  objects.push(new PhysicsObject(800, 200, 30, "teddy"));
  objects.push(new PhysicsObject(100, 200, 30, "teddy"));
  objects.push(new PhysicsObject(200, 200, 30, "teddy"));
  objects.push(new PhysicsObject(250, 200, 30, "teddy"));
  objects.push(new PhysicsObject(350, 200, 30, "teddy"));
  objects.push(new PhysicsObject(450, 200, 30, "teddy"));
  objects.push(new PhysicsObject(550, 200, 30, "teddy"));
  objects.push(new PhysicsObject(650, 200, 30, "teddy"));
  
  

}

function draw() {
  background(0,150,200);
  
  push()
  fill(200,200,0)
  circle(100,100,200)
  pop()

  water.update();
  water.display();

  for (let obj of objects) {
    obj.update();
    obj.display();
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
// MOUSE EVENTS
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