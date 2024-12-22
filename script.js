const canvas = document.getElementById("pinkboard");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 1500;

// Heart shape function
function heartShape(t) {
  const scale = 10;
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -(
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  );
  return { x: x * scale, y: y * scale };
}

class Particle {
  constructor() {
    const angle = Math.random() * Math.PI * 2;
    const position = heartShape(angle);

    this.x = canvas.width / 2 + position.x;
    this.y = canvas.height / 2 + position.y;
    this.size = Math.random() * 3 + 1;
    this.opacity = Math.random();
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.color = `rgba(255, 20, 147, ${this.opacity})`;
    this.life = Math.random() * 100 + 50; // Lifespan of particles
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    if (this.life <= 0) {
      this.reset();
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  reset() {
    const angle = Math.random() * Math.PI * 2;
    const position = heartShape(angle);

    this.x = canvas.width / 2 + position.x;
    this.y = canvas.height / 2 + position.y;
    this.size = Math.random() * 3 + 1;
    this.opacity = Math.random();
    this.color = `rgba(255, 20, 147, ${this.opacity})`;
    this.life = Math.random() * 100 + 50;
  }
}

function init() {
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

init();
animate();
