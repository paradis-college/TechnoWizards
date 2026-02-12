const lidarSketch = p => {
  let rays = [];
  let walls = [];
  let angleOffset = 0;
  let scanPoints = [];
  let robotPulse = 0;

  p.setup = () => {
    const canvas = p.createCanvas(500, 400);
    canvas.parent("lidar-canvas");

    // Create living room / cave-like walls with furniture
    // Back wall
    walls.push({ x1: 50, y1: 50, x2: 450, y2: 50 });
    
    // Right wall with opening
    walls.push({ x1: 450, y1: 50, x2: 450, y2: 150 });
    walls.push({ x1: 450, y1: 250, x2: 450, y2: 350 });
    
    // Front wall
    walls.push({ x1: 450, y1: 350, x2: 50, y2: 350 });
    
    // Left wall with opening
    walls.push({ x1: 50, y1: 350, x2: 50, y2: 250 });
    walls.push({ x1: 50, y1: 150, x2: 50, y2: 50 });
    
    // Furniture: Couch (left side)
    walls.push({ x1: 80, y1: 280, x2: 180, y2: 280 });
    walls.push({ x1: 180, y1: 280, x2: 180, y2: 320 });
    walls.push({ x1: 180, y1: 320, x2: 80, y2: 320 });
    walls.push({ x1: 80, y1: 320, x2: 80, y2: 280 });
    
    // Furniture: Table (center)
    walls.push({ x1: 220, y1: 180, x2: 320, y2: 180 });
    walls.push({ x1: 320, y1: 180, x2: 320, y2: 220 });
    walls.push({ x1: 320, y1: 220, x2: 220, y2: 220 });
    walls.push({ x1: 220, y1: 220, x2: 220, y2: 180 });
    
    // Furniture: Shelf (right side)
    walls.push({ x1: 380, y1: 100, x2: 420, y2: 100 });
    walls.push({ x1: 420, y1: 100, x2: 420, y2: 140 });
    walls.push({ x1: 420, y1: 140, x2: 380, y2: 140 });
    walls.push({ x1: 380, y1: 140, x2: 380, y2: 100 });
    
    // Small irregular cave features
    walls.push({ x1: 120, y1: 80, x2: 150, y2: 100 });
    walls.push({ x1: 350, y1: 300, x2: 380, y2: 320 });

    // More rays for better visualization
    for (let a = 0; a < 360; a += 2) {
      rays.push(p.radians(a));
    }
  };

  p.draw = () => {
    // Dark cave/room background
    p.background(5, 10, 20);

    // Room floor effect
    p.noStroke();
    p.fill(15, 20, 30, 50);
    p.rect(0, 0, p.width, p.height);

    angleOffset = p.map(p.mouseX, 0, p.width, -p.PI, p.PI);
    robotPulse += 0.05;

    // Draw walls with room texture
    p.stroke(140, 120, 100);
    p.strokeWeight(4);
    walls.forEach((w, index) => {
      // Vary colors for furniture vs walls
      if (index < 6) {
        p.stroke(100, 120, 140); // Walls
      } else {
        p.stroke(120, 100, 80); // Furniture
      }
      p.line(w.x1, w.y1, w.x2, w.y2);
    });

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
    p.text(`Scanning Room: ${scanPoints.length} points`, 10, 20);
    p.text(`Rotation: ${Math.floor((angleOffset * 180 / Math.PI + 180) % 360)}°`, 10, 35);
    p.text(`Obstacles: Walls + Furniture`, 10, 50);
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
