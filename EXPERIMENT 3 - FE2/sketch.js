



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
    //MORE VIOLENT WAVE
    return this.y + sin(x * 0.04 + this.waveOffset) * 40;
    //MORE STEADY WAVE
    return this.y + sin(x*0.02 + this.waveOffset) * 10;
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
// PHYSICS OBJECTS
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

      this.applyForce(createVector(0, 0.3 * this.mass));

      if (this.type === "balloon") {
        this.applyForce(createVector(0, -0.4));
      }

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
      fill(200, 150,0);
      ellipse(0, 0, this.r * 2);
      ellipse(-10,-20,this.r *1.5)
      triangle(-30,-20,-30,-30,-40,-20)
    }

    pop();
  }

  pressed(mx, my) {
    if (dist(mx, my, this.pos.x, this.pos.y) < this.r) {
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
// FISH (FIXED INTERACTION)
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

    let surface = water.getSurface(this.pos.x);

    // keep fish UNDER water surface
    let minDepth = surface + 20;
    let maxDepth = height - 30;

    if (this.pos.y < minDepth) this.pos.y += 2;
    if (this.pos.y > maxDepth) this.pos.y -= 1;

    // =========================
    // 🐟 STRONGER OBJECT PUSH
    // =========================
    for (let obj of objects) {
      let d = dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y);

      if (d < this.size + obj.r) {

        // direction from fish to object
        let dir = p5.Vector.sub(obj.pos, this.pos);

        if (dir.mag() > 0) {
          dir.normalize();
        }

        // stronger impulse force
        let force = dir.mult(1.2);

        obj.applyForce(force);
      }
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);

    fill(255, 200, 100);
    stroke(0);
    strokeWeight(2)

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
// BUBBLES (FIXED: UNDERWATER ONLY)
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

    let surface = water.getSurface(this.pos.x);

    // KEEP BUBBLES UNDER WATER ONLY
    if (this.pos.y < surface + 10) {
      this.pos.y += 1.5;
      this.vel.y = abs(this.vel.y); // force downward drift
    }

    for (let obj of objects) {
      let d = dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y);
      if (d < obj.r) {
        obj.vel.y -= 0.02;
      }
    }
  }

  display() {
    fill(255, 255, 255, 150);
    stroke(0);
    strokeWeight(3)
    ellipse(this.pos.x, this.pos.y, this.size);
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
  
  stroke(0)
  strokeWeight(3)
  
  objects.push(new PhysicsObject(200, 100, 55, "basketball"));
  objects.push(new PhysicsObject(400, 100, 30, "balloon"));
  objects.push(new PhysicsObject(600, 100, 35, "hammer"));
  objects.push(new PhysicsObject(300, 200, 30, "teddy"));
  
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

  for (let i = 0; i < 10; i++) {
    fish.push(new Fish(random(width), random(height * 0.55, height - 50)));
  }
}

// =======================
// DRAW
// =======================
function draw() {
  background(0, 150, 200);

  
  fill(255, 255, 0);
  circle(100, 100, 200);
  
  push()
  fill(203,200,0)
  rect(0,1150,1300,200)
  pop()

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

    if (bubbles[i].pos.y < water.getSurface(bubbles[i].pos.x) - 50) {
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