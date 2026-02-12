let bot;
let obstacles = [];
let path = [];
let particles = [];
let targetPoint;
let pathfindingGrid;
let gridSize = 20;

function setup() {
  const canvas = createCanvas(500, 400);
  canvas.parent("nav-canvas");

  bot = {
    x: 50,
    y: 200,
    angle: 0,
    targetAngle: 0,
    speed: 1.5,
    scanning: true,
    sensorRange: 80,
    path: []
  };

  // Create more complex obstacles
  obstacles = [
    { x: 180, y: 80, w: 50, h: 80, type: 'wall' },
    { x: 320, y: 200, w: 60, h: 60, type: 'wall' },
    { x: 140, y: 280, w: 70, h: 40, type: 'wall' },
    { x: 380, y: 100, w: 40, h: 120, type: 'wall' }
  ];

  targetPoint = { x: 450, y: 350 };

  // Initialize pathfinding grid
  initPathfindingGrid();

  // Calculate initial path
  calculatePath();
}

function draw() {
  // Dark tech background
  background(5, 10, 20);

  // Grid overlay (tech aesthetic)
  drawGrid();

  // Target point
  drawTarget();

  // Draw obstacles with glow
  drawObstacles();

  // Draw calculated path
  drawPath();

  // Update and draw particles
  updateParticles();

  // Draw sensor visualization
  drawSensorRange();

  // Update bot position
  updateBot();

  // Draw bot with wizard theme
  drawBot();

  // Stats display
  drawStats();
}

function drawGrid() {
  stroke(0, 180, 255, 20);
  strokeWeight(1);

  for (let x = 0; x < width; x += gridSize) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += gridSize) {
    line(0, y, width, y);
  }
}

function drawTarget() {
  // Pulsing target
  let pulseSize = 20 + sin(frameCount * 0.05) * 5;

  // Outer glow
  noStroke();
  fill(255, 215, 0, 30);
  ellipse(targetPoint.x, targetPoint.y, pulseSize * 3, pulseSize * 3);

  // Target circle
  stroke(255, 215, 0);
  strokeWeight(2);
  noFill();
  ellipse(targetPoint.x, targetPoint.y, pulseSize, pulseSize);

  // Center dot
  fill(255, 215, 0);
  noStroke();
  ellipse(targetPoint.x, targetPoint.y, 8, 8);

  // Wizard star
  textSize(16);
  text('⭐', targetPoint.x - 8, targetPoint.y + 6);
}

function drawObstacles() {
  obstacles.forEach(obs => {
    // Glow effect
    noStroke();
    fill(168, 85, 247, 20);
    rect(obs.x - 5, obs.y - 5, obs.w + 10, obs.h + 10, 5);

    // Main obstacle
    fill(120, 50, 180);
    stroke(168, 85, 247);
    strokeWeight(2);
    rect(obs.x, obs.y, obs.w, obs.h, 3);

    // Tech pattern
    stroke(168, 85, 247, 100);
    strokeWeight(1);
    for (let i = 10; i < obs.h; i += 15) {
      line(obs.x + 5, obs.y + i, obs.x + obs.w - 5, obs.y + i);
    }
  });
}

function drawPath() {
  if (path.length > 1) {
    stroke(0, 255, 200, 100);
    strokeWeight(2);
    noFill();

    beginShape();
    for (let i = 0; i < path.length; i++) {
      let p = path[i];
      vertex(p.x, p.y);

      // Path nodes
      if (i % 3 === 0) {
        noStroke();
        fill(0, 255, 200, 150);
        ellipse(p.x, p.y, 4, 4);
        stroke(0, 255, 200, 100);
        strokeWeight(2);
      }
    }
    endShape();
  }
}

function drawSensorRange() {
  // Scanning arc
  noFill();
  stroke(0, 180, 255, 50);
  strokeWeight(1);

  for (let r = 20; r < bot.sensorRange; r += 15) {
    arc(bot.x, bot.y, r * 2, r * 2, bot.angle - PI / 3, bot.angle + PI / 3);
  }

  // Sensor beams
  stroke(0, 180, 255, 80);
  for (let a = -PI / 3; a <= PI / 3; a += PI / 12) {
    let beamAngle = bot.angle + a;
    let beamX = bot.x + cos(beamAngle) * bot.sensorRange;
    let beamY = bot.y + sin(beamAngle) * bot.sensorRange;

    // Check for obstacles in beam path
    let hitObstacle = false;
    obstacles.forEach(obs => {
      if (lineIntersectsRect(bot.x, bot.y, beamX, beamY, obs)) {
        hitObstacle = true;
      }
    });

    if (hitObstacle) {
      stroke(255, 100, 100, 120);
    } else {
      stroke(0, 180, 255, 60);
    }
    line(bot.x, bot.y, beamX, beamY);
  }
}

function updateBot() {
  // Follow path if exists
  if (path.length > 0) {
    let target = path[0];
    let dx = target.x - bot.x;
    let dy = target.y - bot.y;
    let distance = sqrt(dx * dx + dy * dy);

    if (distance < 10) {
      path.shift();
      if (path.length > 0) {
        target = path[0];
        dx = target.x - bot.x;
        dy = target.y - bot.y;
      }
    }

    if (path.length > 0) {
      // Calculate target angle
      bot.targetAngle = atan2(dy, dx);

      // Smooth angle interpolation
      let angleDiff = bot.targetAngle - bot.angle;
      // Normalize angle difference to [-PI, PI]
      angleDiff = ((angleDiff + PI) % TWO_PI + TWO_PI) % TWO_PI - PI;
      bot.angle += angleDiff * 0.1;

      // Move forward
      bot.x += cos(bot.angle) * bot.speed;
      bot.y += sin(bot.angle) * bot.speed;

      // Add trail particles
      if (frameCount % 3 === 0) {
        particles.push({
          x: bot.x,
          y: bot.y,
          life: 1,
          size: random(2, 4)
        });
      }
    } else {
      // Reached target, recalculate path
      if (dist(bot.x, bot.y, targetPoint.x, targetPoint.y) > 20) {
        calculatePath();
      }
    }
  }

  // Check if stuck or collision
  let stuck = false;
  obstacles.forEach(obs => {
    if (pointInRect(bot.x, bot.y, obs)) {
      stuck = true;
    }
  });

  if (stuck) {
    // Back up and recalculate
    bot.x -= cos(bot.angle) * bot.speed * 2;
    bot.y -= sin(bot.angle) * bot.speed * 2;
    calculatePath();
  }
}

function drawBot() {
  push();
  translate(bot.x, bot.y);
  rotate(bot.angle);

  // Bot glow
  noStroke();
  fill(0, 180, 255, 40);
  ellipse(0, 0, 35, 35);

  // Bot body
  fill(0, 120, 255);
  stroke(0, 180, 255);
  strokeWeight(2);
  rect(-12, -8, 24, 16, 3);

  // Wizard hat
  fill(168, 85, 247);
  noStroke();
  triangle(-14, -8, 14, -8, 0, -22);
  fill(147, 51, 234);
  rect(-16, -8, 32, 4);

  // Magic sparkle on hat
  fill(255, 215, 0);
  textSize(10);
  text('✨', -4, -14);

  // Bot front indicator
  fill(0, 255, 200);
  noStroke();
  triangle(8, -4, 8, 4, 16, 0);

  // Eyes
  fill(255);
  ellipse(-5, -2, 3, 3);
  ellipse(5, -2, 3, 3);

  pop();
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.life -= 0.02;

    if (p.life <= 0) {
      particles.splice(i, 1);
    } else {
      noStroke();
      fill(0, 180, 255, p.life * 150);
      ellipse(p.x, p.y, p.size * p.life, p.size * p.life);
    }
  }
}

function drawStats() {
  fill(0, 180, 255);
  noStroke();
  textSize(12);
  textAlign(LEFT);
  text(`Position: (${Math.floor(bot.x)}, ${Math.floor(bot.y)})`, 10, 20);
  text(`Heading: ${Math.floor((bot.angle * 180 / PI + 360) % 360)}°`, 10, 35);
  text(`Waypoints: ${path.length}`, 10, 50);

  let distToTarget = dist(bot.x, bot.y, targetPoint.x, targetPoint.y);
  text(`Distance to Goal: ${Math.floor(distToTarget)}`, 10, 65);
}

function initPathfindingGrid() {
  // Simplified grid for pathfinding
  pathfindingGrid = [];
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let blocked = false;
      obstacles.forEach(obs => {
        if (pointInRect(x, y, obs)) {
          blocked = true;
        }
      });
      if (!blocked) {
        pathfindingGrid.push({ x, y });
      }
    }
  }
}

function calculatePath() {
  // Simple A* pathfinding
  path = [];
  let current = { x: bot.x, y: bot.y };
  let target = targetPoint;

  // Simplified path - just create waypoints around obstacles
  let numWaypoints = 8;
  for (let i = 1; i <= numWaypoints; i++) {
    let t = i / numWaypoints;
    let wayX = lerp(current.x, target.x, t);
    let wayY = lerp(current.y, target.y, t);

    // Adjust waypoint if it hits obstacle
    let adjusted = adjustForObstacles(wayX, wayY);
    path.push(adjusted);
  }
}

function adjustForObstacles(x, y) {
  let bestX = x;
  let bestY = y;

  obstacles.forEach(obs => {
    if (pointInRect(x, y, obs)) {
      // Push point away from obstacle
      let obstacleCenter = { x: obs.x + obs.w / 2, y: obs.y + obs.h / 2 };
      let angle = atan2(y - obstacleCenter.y, x - obstacleCenter.x);
      let pushDist = 50;
      bestX = obstacleCenter.x + cos(angle) * (obs.w / 2 + pushDist);
      bestY = obstacleCenter.y + sin(angle) * (obs.h / 2 + pushDist);
    }
  });

  return { x: bestX, y: bestY };
}

function pointInRect(x, y, rect) {
  return x > rect.x && x < rect.x + rect.w &&
         y > rect.y && y < rect.y + rect.h;
}

function lineIntersectsRect(x1, y1, x2, y2, rect) {
  // Simplified collision check
  let corners = [
    { x: rect.x, y: rect.y },
    { x: rect.x + rect.w, y: rect.y },
    { x: rect.x + rect.w, y: rect.y + rect.h },
    { x: rect.x, y: rect.y + rect.h }
  ];

  for (let corner of corners) {
    if (lineCircleIntersect(x1, y1, x2, y2, corner.x, corner.y, 5)) {
      return true;
    }
  }
  return false;
}

function lineCircleIntersect(x1, y1, x2, y2, cx, cy, r) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let len = sqrt(dx * dx + dy * dy);
  dx /= len;
  dy /= len;

  let t = dx * (cx - x1) + dy * (cy - y1);
  t = constrain(t, 0, len);

  let closestX = x1 + t * dx;
  let closestY = y1 + t * dy;

  let distance = dist(closestX, closestY, cx, cy);
  return distance < r;
}
