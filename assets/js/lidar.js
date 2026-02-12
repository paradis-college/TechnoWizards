const lidarSketch = p => {
  let rays = [];
  let walls = [];
  let angleOffset = 0;
  let scanPoints = [];
  let robotPulse = 0;

  p.setup = () => {
    const canvas = p.createCanvas(500, 400);
    canvas.parent("lidar-canvas");

    // Create more interesting cave-like walls
    for (let i = 0; i < 8; i++) {
      const angle = (p.TWO_PI / 8) * i;
      const dist = 150 + p.random(-30, 30);
      const x = p.width / 2 + p.cos(angle) * dist;
      const y = p.height / 2 + p.sin(angle) * dist;

      walls.push({
        x1: x,
        y1: y,
        x2: p.width / 2 + p.cos(angle + p.TWO_PI / 8) * (dist + p.random(-20, 20)),
        y2: p.height / 2 + p.sin(angle + p.TWO_PI / 8) * (dist + p.random(-20, 20))
      });
    }

    // Boundary walls
    walls.push({ x1: 0, y1: 0, x2: p.width, y2: 0 });
    walls.push({ x1: p.width, y1: 0, x2: p.width, y2: p.height });
    walls.push({ x1: p.width, y1: p.height, x2: 0, y2: p.height });
    walls.push({ x1: 0, y1: p.height, x2: 0, y2: 0 });

    // More rays for better visualization
    for (let a = 0; a < 360; a += 2) {
      rays.push(p.radians(a));
    }
  };

  p.draw = () => {
    // Dark cave background
    p.background(5, 10, 20);

    // Ambient cave effect
    p.noStroke();
    p.fill(10, 20, 40, 30);
    p.ellipse(p.width / 2, p.height / 2, 400, 400);

    angleOffset = p.map(p.mouseX, 0, p.width, -p.PI, p.PI);
    robotPulse += 0.05;

    // Draw walls with cave texture
    p.stroke(100, 120, 140);
    p.strokeWeight(3);
    walls.forEach(w => p.line(w.x1, w.y1, w.x2, w.y2));

    p.translate(p.width / 2, p.height / 2);

    // Cast rays and collect scan data
    let newScanPoints = [];
    rays.forEach((a, index) => {
      let rayAngle = a + angleOffset;
      let record = Infinity;
      let closest = null;

      walls.forEach(w => {
        const pt = castRay(rayAngle, w);
        if (pt) {
          const d = p.dist(0, 0, pt.x, pt.y);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      });

      if (closest) {
        // Gradient ray based on distance
        const alpha = p.map(record, 0, 200, 180, 40);
        const rayColor = index % 3 === 0 ? [168, 85, 247] : [0, 180, 255];
        p.stroke(rayColor[0], rayColor[1], rayColor[2], alpha);
        p.strokeWeight(1);
        p.line(0, 0, closest.x, closest.y);

        // Scan point at wall intersection
        newScanPoints.push({
          x: closest.x,
          y: closest.y,
          dist: record,
          angle: rayAngle
        });

        // Glow at impact point
        p.noStroke();
        p.fill(rayColor[0], rayColor[1], rayColor[2], alpha * 0.8);
        p.ellipse(closest.x, closest.y, 4, 4);
      }
    });

    scanPoints = newScanPoints;

    // Draw mapped area visualization
    if (scanPoints.length > 3) {
      p.noStroke();
      p.fill(0, 180, 255, 15);
      p.beginShape();
      scanPoints.forEach(pt => {
        p.vertex(pt.x, pt.y);
      });
      p.endShape(p.CLOSE);
    }

    // Draw robot with wizard theme
    p.push();

    // Pulsing glow effect
    p.noStroke();
    let pulseSize = 25 + p.sin(robotPulse) * 5;
    p.fill(168, 85, 247, 30);
    p.ellipse(0, 0, pulseSize * 2, pulseSize * 2);

    // Robot body
    p.fill(0, 120, 255);
    p.stroke(0, 180, 255);
    p.strokeWeight(2);
    p.rect(-10, -10, 20, 20, 3);

    // Wizard hat
    p.fill(168, 85, 247);
    p.noStroke();
    p.triangle(-12, -10, 12, -10, 0, -25);

    // Hat stars
    p.fill(255, 215, 0);
    p.textSize(8);
    p.text('✨', -3, -17);

    // Robot eyes
    p.fill(255);
    p.ellipse(-4, -4, 3, 3);
    p.ellipse(4, -4, 3, 3);

    // Sensor indicator
    p.stroke(0, 255, 200);
    p.strokeWeight(1);
    p.noFill();
    p.arc(0, 0, 30, 30, angleOffset - p.PI / 4, angleOffset + p.PI / 4);

    p.pop();

    // Distance measurement display
    p.resetMatrix();
    p.fill(0, 180, 255);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT);
    p.text(`Scanning: ${scanPoints.length} points`, 10, 20);
    p.text(`Rotation: ${Math.floor((angleOffset * 180 / Math.PI + 180) % 360)}°`, 10, 35);
  };

  function castRay(angle, wall) {
    const x1 = wall.x1 - p.width / 2;
    const y1 = wall.y1 - p.height / 2;
    const x2 = wall.x2 - p.width / 2;
    const y2 = wall.y2 - p.height / 2;

    const x3 = 0;
    const y3 = 0;
    const x4 = p.cos(angle) * 1000;
    const y4 = p.sin(angle) * 1000;

    const den = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);
    if (den === 0) return;

    const t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4)) / den;
    const u = -((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3)) / den;

    if (t > 0 && t < 1 && u > 0) {
      return {
        x: x1 + t * (x2 - x1),
        y: y1 + t * (y2 - y1)
      };
    }
  }
};

new p5(lidarSketch);
