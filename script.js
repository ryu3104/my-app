const particles = [];
const connectionDistance = 145;
let particleCount = 84;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
  particleCount = windowWidth < 720 ? 48 : 84;

  for (let i = 0; i < particleCount; i += 1) {
    particles.push(new Particle());
  }
}

function draw() {
  background(7, 17, 31, 42);
  drawConnections();

  for (const particle of particles) {
    particle.update();
    particle.draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawConnections() {
  strokeWeight(1);

  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const first = particles[i];
      const second = particles[j];
      const distance = dist(first.position.x, first.position.y, second.position.x, second.position.y);

      if (distance < connectionDistance) {
        const alpha = map(distance, 0, connectionDistance, 145, 0);
        stroke(125, 211, 252, alpha);
        line(first.position.x, first.position.y, second.position.x, second.position.y);
      }
    }
  }
}

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D().mult(random(0.35, 1.15));
    this.radius = random(2.2, 4.8);
    this.hueShift = random(0, 1);
  }

  update() {
    this.position.add(this.velocity);

    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }

    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);
  }

  draw() {
    noStroke();

    const blue = lerp(180, 252, this.hueShift);
    fill(125, blue, 252, 210);
    circle(this.position.x, this.position.y, this.radius * 2);

    fill(255, 255, 255, 90);
    circle(this.position.x - this.radius * 0.25, this.position.y - this.radius * 0.25, this.radius);
  }
}
