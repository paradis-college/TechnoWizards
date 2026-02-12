const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const stars = [];
const scanLines = [];

// Wizard Robot properties
const robot = {
  x: canvas.width * 0.75,
  y: canvas.height * 0.6,
  angle: 0,
  scanAngle: 0,
  scanRadius: 150,
  mappedPoints: []
};

// Enhanced particle system
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.6 + 0.2;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random();
    this.color = Math.random() > 0.7 ? '#a855f7' : '#00b3ff';
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
  }

  draw() {
    ctx.fillStyle = `${this.color}${Math.floor(this.alpha * 255).toString(16).padStart(2, '0')}`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Stars for magical effect
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.twinkleSpeed = Math.random() * 0.05 + 0.02;
    this.brightness = Math.random();
  }

  update() {
    this.brightness += this.twinkleSpeed;
    if (this.brightness > 1 || this.brightness < 0) {
      this.twinkleSpeed *= -1;
    }
  }

  draw() {
    ctx.fillStyle = `rgba(255, 255, 200, ${this.brightness * 0.8})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize particles and stars
for (let i = 0; i < 150; i++) {
  particles.push(new Particle());
}

for (let i = 0; i < 80; i++) {
  stars.push(new Star());
}

// Draw wizard robot with hat
function drawWizardRobot() {
  const x = robot.x;
  const y = robot.y;

  // Robot body with glow
  ctx.shadowBlur = 20;
  ctx.shadowColor = '#00b3ff';

  // Main body
  ctx.fillStyle = '#0077ff';
  ctx.fillRect(x - 20, y - 10, 40, 50);

  // Head
  ctx.fillStyle = '#00b3ff';
  ctx.beginPath();
  ctx.arc(x, y - 30, 18, 0, Math.PI * 2);
  ctx.fill();

  // Eyes with glow
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x - 6, y - 32, 4, 0, Math.PI * 2);
  ctx.arc(x + 6, y - 32, 4, 0, Math.PI * 2);
  ctx.fill();

  // Wizard hat
  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.moveTo(x - 25, y - 42);
  ctx.lineTo(x + 25, y - 42);
  ctx.lineTo(x, y - 75);
  ctx.closePath();
  ctx.fill();

  // Hat brim
  ctx.fillStyle = '#9333ea';
  ctx.fillRect(x - 28, y - 42, 56, 6);

  // Magic stars on hat
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#ffd700';
  for (let i = 0; i < 3; i++) {
    const angle = Date.now() * 0.001 + i * (Math.PI * 2 / 3);
    const sx = x + Math.cos(angle) * 12;
    const sy = y - 58 + Math.sin(angle) * 8;
    drawStar(sx, sy, 3, 5);
  }

  // Arms
  ctx.shadowBlur = 15;
  ctx.fillStyle = '#0077ff';
  ctx.fillRect(x - 30, y + 5, 10, 25);
  ctx.fillRect(x + 20, y + 5, 10, 25);

  // Legs
  ctx.fillRect(x - 15, y + 40, 10, 20);
  ctx.fillRect(x + 5, y + 40, 10, 20);

  ctx.shadowBlur = 0;
}

// Draw a star shape
function drawStar(x, y, spikes, outerRadius) {
  let rot = Math.PI / 2 * 3;
  let innerRadius = outerRadius / 2;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(x, y - outerRadius);

  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
    rot += step;
    ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
    rot += step;
  }

  ctx.lineTo(x, y - outerRadius);
  ctx.closePath();
  ctx.fill();
}

// Draw scanning/mapping visualization
function drawCartographyScan() {
  const x = robot.x;
  const y = robot.y;

  // Rotating scan beam
  robot.scanAngle += 0.02;

  ctx.strokeStyle = `rgba(168, 85, 247, 0.3)`;
  ctx.lineWidth = 2;

  for (let i = 0; i < 8; i++) {
    const angle = robot.scanAngle + (i * Math.PI / 4);
    const endX = x + Math.cos(angle) * robot.scanRadius;
    const endY = y + Math.sin(angle) * robot.scanRadius;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Scan point
    ctx.fillStyle = `rgba(168, 85, 247, ${0.6 + Math.sin(Date.now() * 0.003 + i) * 0.4})`;
    ctx.beginPath();
    ctx.arc(endX, endY, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add mapped points
  if (Math.random() > 0.9 && robot.mappedPoints.length < 50) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * robot.scanRadius;
    robot.mappedPoints.push({
      x: x + Math.cos(angle) * dist,
      y: y + Math.sin(angle) * dist,
      life: 1
    });
  }

  // Draw and fade mapped points
  robot.mappedPoints = robot.mappedPoints.filter(point => {
    point.life -= 0.005;
    if (point.life > 0) {
      ctx.fillStyle = `rgba(0, 179, 255, ${point.life * 0.6})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
      ctx.fill();
      return true;
    }
    return false;
  });

  // Grid lines (cartography effect)
  ctx.strokeStyle = 'rgba(0, 179, 255, 0.1)';
  ctx.lineWidth = 1;

  for (let i = 0; i < 6; i++) {
    const radius = (i + 1) * 25;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// Animated magical runes/symbols
function drawMagicalElements() {
  const time = Date.now() * 0.001;

  // Floating runes
  for (let i = 0; i < 5; i++) {
    const x = 100 + i * 250;
    const y = 150 + Math.sin(time + i) * 30;
    const alpha = 0.2 + Math.sin(time * 2 + i) * 0.1;

    ctx.font = '30px Orbitron';
    ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
    const runes = ['⚡', '🔮', '✨', '⭐', '🌟'];
    ctx.fillText(runes[i], x, y);
  }
}

function animate() {
  // Create trail effect
  ctx.fillStyle = 'rgba(2, 8, 20, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw stars
  stars.forEach(star => {
    star.update();
    star.draw();
  });

  // Draw particles
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // Draw magical elements
  drawMagicalElements();

  // Draw scanning visualization
  drawCartographyScan();

  // Draw wizard robot
  drawWizardRobot();

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  robot.x = canvas.width * 0.75;
  robot.y = canvas.height * 0.6;
});
