const navSketch = p => {
let bot;
let obstacles = [];
let path = [];
let particles = [];
let targetPoint;
let pathfindingGrid;
let gridSize = 20;

p.setup = () => {
  const canvas = p.createCanvas(400, 320);
  canvas.parent("nav-canvas");

  bot = {
    x: 40,
    y: 160,
    angle: 0,
    targetAngle: 0,
    speed: 1.5,
    scanning: true,
    sensorRange: 80,
    path: []
  };

  // Create more complex obstacles
  obstacles = [
    { x: 144, y: 64, w: 40, h: 64, type: 'wall' },
    { x: 256, y: 160, w: 48, h: 48, type: 'wall' },
    { x: 112, y: 224, w: 56, h: 32, type: 'wall' },
    { x: 304, y: 80, w: 32, h: 96, type: 'wall' }
  ];

  targetPoint = { x: 360, y: 280 };

  // Initialize pathfinding grid
  initPathfindingGrid();

  // Calculate initial path
  calculatePath();
};

p.draw = () => {
  // Dark tech background
  p.background(5, 10, 20);

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
};

function drawGrid() {
  p.stroke(0, 180, 255, 20);
  p.strokeWeight(1);

  for (let x = 0; x < p.width; x += gridSize) {
    p.line(x, 0, x, p.height);
  }
  for (let y = 0; y < p.height; y += gridSize) {
    p.line(0, y, p.width, y);
  }
}

function drawTarget() {
  // Pulsing target
  let pulseSize = 20 + p.sin(p.frameCount * 0.05) * 5;

  // Outer glow
  p.noStroke();
  p.fill(255, 215, 0, 30);
  p.ellipse(targetPoint.x, targetPoint.y, pulseSize * 3, pulseSize * 3);

  // Target circle
  p.stroke(255, 215, 0);
  p.strokeWeight(2);
  p.noFill();
  p.ellipse(targetPoint.x, targetPoint.y, pulseSize, pulseSize);

  // Center dot
  p.fill(255, 215, 0);
  p.noStroke();
  p.ellipse(targetPoint.x, targetPoint.y, 8, 8);

  // Wizard star
  p.textSize(16);
  p.text('⭐', targetPoint.x - 8, targetPoint.y + 6);
}

function drawObstacles() {
  obstacles.forEach(obs => {
    // Glow effect
    p.noStroke();
    p.fill(168, 85, 247, 20);
    p.rect(obs.x - 5, obs.y - 5, obs.w + 10, obs.h + 10, 5);

    // Main obstacle
    p.fill(120, 50, 180);
    p.stroke(168, 85, 247);
    p.strokeWeight(2);
    p.rect(obs.x, obs.y, obs.w, obs.h, 3);

    // Tech pattern
    p.stroke(168, 85, 247, 100);
    p.strokeWeight(1);
    for (let i = 10; i < obs.h; i += 15) {
      p.line(obs.x + 5, obs.y + i, obs.x + obs.w - 5, obs.y + i);
    }
  });
}

function drawPath() {
  if (path.length > 1) {
    p.stroke(0, 255, 200, 100);
    p.strokeWeight(2);
    p.noFill();

    p.beginShape();
    for (let i = 0; i < path.length; i++) {
      let pathPoint = path[i];
      p.vertex(pathPoint.x, pathPoint.y);

      // Path nodes
      if (i % 3 === 0) {
        p.noStroke();
        p.fill(0, 255, 200, 150);
        p.ellipse(pathPoint.x, pathPoint.y, 4, 4);
        p.stroke(0, 255, 200, 100);
        p.strokeWeight(2);
      }
    }
    p.endShape();
  }
}

function drawSensorRange() {
  // Scanning arc
  p.noFill();
  p.stroke(0, 180, 255, 50);
  p.strokeWeight(1);

  for (let r = 20; r < bot.sensorRange; r += 15) {
    p.arc(bot.x, bot.y, r * 2, r * 2, bot.angle - p.PI / 3, bot.angle + p.PI / 3);
  }

  // Sensor beams
  p.stroke(0, 180, 255, 80);
  for (let a = -p.PI / 3; a <= p.PI / 3; a += p.PI / 12) {
    let beamAngle = bot.angle + a;
    let beamX = bot.x + p.cos(beamAngle) * bot.sensorRange;
    let beamY = bot.y + p.sin(beamAngle) * bot.sensorRange;

    // Check for obstacles in beam path
    let hitObstacle = false;
    obstacles.forEach(obs => {
      if (lineIntersectsRect(bot.x, bot.y, beamX, beamY, obs)) {
        hitObstacle = true;
      }
    });

    if (hitObstacle) {
      p.stroke(255, 100, 100, 120);
    } else {
      p.stroke(0, 180, 255, 60);
    }
    p.line(bot.x, bot.y, beamX, beamY);
  }
}

function updateBot() {
  // Follow path if exists
  if (path.length > 0) {
    let target = path[0];
    let dx = target.x - bot.x;
    let dy = target.y - bot.y;
    let distance = p.sqrt(dx * dx + dy * dy);

    if (distance < 10) {
      path.shift();
      if (path.length > 0) {
        target = path[0];
        dx = target.x - bot.x;
        dy = target.y - bot.y;
      } else {
        // Reached final target, pick a new random target and recalculate
        pickNewTarget();
        calculatePath();
      }
    }

    if (path.length > 0) {
      // Calculate target angle
      bot.targetAngle = p.atan2(dy, dx);

      // Smooth angle interpolation
      let angleDiff = bot.targetAngle - bot.angle;
      // Normalize angle difference to [-PI, PI]
      angleDiff = ((angleDiff + p.PI) % p.TWO_PI + p.TWO_PI) % p.TWO_PI - p.PI;
      bot.angle += angleDiff * 0.1;

      // Move forward
      bot.x += p.cos(bot.angle) * bot.speed;
      bot.y += p.sin(bot.angle) * bot.speed;

      // Add trail particles
      if (p.frameCount % 3 === 0) {
        particles.push({
          x: bot.x,
          y: bot.y,
          life: 1,
          size: p.random(2, 4)
        });
      }
    }
  } else {
    // No path, pick a new target
    pickNewTarget();
    calculatePath();
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
    bot.x -= p.cos(bot.angle) * bot.speed * 2;
    bot.y -= p.sin(bot.angle) * bot.speed * 2;
    pickNewTarget();
    calculatePath();
  }
}

// Pick a new random target
function pickNewTarget() {
  // Pick a random point that's not in an obstacle
  let attempts = 0;
  let foundValid = false;

  while (!foundValid && attempts < 20) {
    targetPoint.x = p.random(40, p.width - 40);
    targetPoint.y = p.random(40, p.height - 40);

    // Check if target is not in an obstacle
    foundValid = true;
    obstacles.forEach(obs => {
      if (pointInRect(targetPoint.x, targetPoint.y, obs)) {
        foundValid = false;
      }
    });

    attempts++;
  }

  // If we couldn't find a valid point, use a safe default
  if (!foundValid) {
    targetPoint.x = 360;
    targetPoint.y = 280;
  }
}

function drawBot() {
  p.push();
  p.translate(bot.x, bot.y);
  p.rotate(bot.angle);

  // Bot glow
  p.noStroke();
  p.fill(0, 180, 255, 40);
  p.ellipse(0, 0, 35, 35);

  // Bot body
  p.fill(0, 120, 255);
  p.stroke(0, 180, 255);
  p.strokeWeight(2);
  p.rect(-12, -8, 24, 16, 3);

  // Wizard hat
  p.fill(168, 85, 247);
  p.noStroke();
  p.triangle(-14, -8, 14, -8, 0, -22);
  p.fill(147, 51, 234);
  p.rect(-16, -8, 32, 4);

  // Magic sparkle on hat
  p.fill(255, 215, 0);
  p.textSize(10);
  p.text('✨', -4, -14);

  // Bot front indicator
  p.fill(0, 255, 200);
  p.noStroke();
  p.triangle(8, -4, 8, 4, 16, 0);

  // Eyes
  p.fill(255);
  p.ellipse(-5, -2, 3, 3);
  p.ellipse(5, -2, 3, 3);

  p.pop();
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.life -= 0.02;

    if (particle.life <= 0) {
      particles.splice(i, 1);
    } else {
      p.noStroke();
      p.fill(0, 180, 255, particle.life * 150);
      p.ellipse(particle.x, particle.y, particle.size * particle.life, particle.size * particle.life);
    }
  }
}

function drawStats() {
  p.fill(0, 180, 255);
  p.noStroke();
  p.textSize(11);
  p.textAlign(p.LEFT);
  p.text(`Position: (${p.floor(bot.x)}, ${p.floor(bot.y)})`, 10, 18);
  p.text(`Heading: ${p.floor((bot.angle * 180 / p.PI + 360) % 360)}°`, 10, 32);
  p.text(`Waypoints: ${path.length}`, 10, 46);

  let distToTarget = p.dist(bot.x, bot.y, targetPoint.x, targetPoint.y);
  p.text(`Distance to Goal: ${p.floor(distToTarget)}`, 10, 60);
}

function initPathfindingGrid() {
  // Simplified grid for pathfinding
  pathfindingGrid = [];
  for (let x = 0; x < p.width; x += gridSize) {
    for (let y = 0; y < p.height; y += gridSize) {
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
    let wayX = p.lerp(current.x, target.x, t);
    let wayY = p.lerp(current.y, target.y, t);

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
      let angle = p.atan2(y - obstacleCenter.y, x - obstacleCenter.x);
      let pushDist = 50;
      bestX = obstacleCenter.x + p.cos(angle) * (obs.w / 2 + pushDist);
      bestY = obstacleCenter.y + p.sin(angle) * (obs.h / 2 + pushDist);
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
  let len = p.sqrt(dx * dx + dy * dy);
  dx /= len;
  dy /= len;

  let t = dx * (cx - x1) + dy * (cy - y1);
  t = p.constrain(t, 0, len);

  let closestX = x1 + t * dx;
  let closestY = y1 + t * dy;

  let distance = p.dist(closestX, closestY, cx, cy);
  return distance < r;
}

};

new p5(navSketch);
