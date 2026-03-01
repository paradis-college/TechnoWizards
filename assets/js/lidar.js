const lidarSketch = p => {
  let rays = [];
  let furniture = [];
  let angleOffset = 0;

  p.setup = () => {
    const canvas = p.createCanvas(400, 320);
    canvas.parent("lidar-canvas");

    // 150 degree laser fan
    for (let a = -75; a <= 75; a += 2) {
      rays.push(p.radians(a));
    }

    // Generate random furniture away from center
    const furnitureCount = p.random(5, 10);
    const centerX = p.width / 2;
    const centerY = p.height / 2;
    const minDistanceFromCenter = 120;
    
    for (let i = 0; i < furnitureCount; i++) {
      let x1, y1, distance;
      // Keep generating until we get a position far from center
      do {
        x1 = p.random(60, 340);
        y1 = p.random(60, 260);
        distance = p.dist(x1, y1, centerX, centerY);
      } while (distance < minDistanceFromCenter);
      
      const angle = p.random(p.TWO_PI);
      const length = p.random(40, 100);
      const x2 = x1 + p.cos(angle) * length;
      const y2 = y1 + p.sin(angle) * length;
      furniture.push({ x1, y1, x2, y2 });
    }
  };

  p.draw = () => {
    // Dark background
    p.background(5, 10, 20);

    angleOffset = p.map(p.mouseX, 0, p.width, -p.PI, p.PI);

    // Draw furniture
    p.stroke(100, 120, 140);
    p.strokeWeight(3);
    furniture.forEach(f => {
      p.line(f.x1, f.y1, f.x2, f.y2);
    });

    p.translate(p.width / 2, p.height / 2);

    // Draw laser rays with collision detection
    rays.forEach((a, index) => {
      let rayAngle = a + angleOffset;
      let record = Infinity;
      let closest = null;

      // Find closest furniture intersection
      furniture.forEach(f => {
        const pt = castRay(rayAngle, f);
        if (pt) {
          const d = p.dist(0, 0, pt.x, pt.y);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      });

      const rayColor = index % 3 === 0 ? [168, 85, 247] : [0, 180, 255];
      p.stroke(rayColor[0], rayColor[1], rayColor[2], 180);
      p.strokeWeight(1);

      if (closest) {
        // Ray hits furniture
        p.line(0, 0, closest.x, closest.y);
        p.noStroke();
        p.fill(rayColor[0], rayColor[1], rayColor[2], 200);
        p.ellipse(closest.x, closest.y, 4, 4);
      } else {
        // Ray goes to max distance
        p.line(0, 0, p.cos(rayAngle) * 150, p.sin(rayAngle) * 150);
        p.noStroke();
        p.fill(rayColor[0], rayColor[1], rayColor[2], 150);
        p.ellipse(p.cos(rayAngle) * 150, p.sin(rayAngle) * 150, 3, 3);
      }
    });



    // Distance measurement display
    p.resetMatrix();
    p.fill(0, 180, 255);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT);
    p.text(`Rotation: ${Math.floor((angleOffset * 180 / Math.PI + 180) % 360)}°`, 10, 20);
  };

  function castRay(angle, furniture) {
    const x1 = furniture.x1 - p.width / 2;
    const y1 = furniture.y1 - p.height / 2;
    const x2 = furniture.x2 - p.width / 2;
    const y2 = furniture.y2 - p.height / 2;

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
