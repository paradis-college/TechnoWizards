const lidarSketch = p => {
  let rays = [];
  let walls = [];
  let angleOffset = 0;

  p.setup = () => {
    const canvas = p.createCanvas(500, 400);
    canvas.parent("lidar-canvas");

    for (let i = 0; i < 6; i++) {
      walls.push({
        x1: p.random(p.width),
        y1: p.random(p.height),
        x2: p.random(p.width),
        y2: p.random(p.height)
      });
    }

    walls.push({ x1: 0, y1: 0, x2: p.width, y2: 0 });
    walls.push({ x1: p.width, y1: 0, x2: p.width, y2: p.height });
    walls.push({ x1: p.width, y1: p.height, x2: 0, y2: p.height });
    walls.push({ x1: 0, y1: p.height, x2: 0, y2: 0 });

    for (let a = -45; a < 45; a += 1) {
      rays.push(p.radians(a));
    }
  };

  p.draw = () => {
    p.background(10);

    angleOffset = p.map(p.mouseX, 0, p.width, -p.PI, p.PI);

    p.stroke(255);
    walls.forEach(w => p.line(w.x1, w.y1, w.x2, w.y2));

    p.translate(p.width / 2, p.height / 2);

    rays.forEach(a => {
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
        p.stroke(0, 180, 255, 120);
        p.line(0, 0, closest.x, closest.y);
      }
    });

    p.noStroke();
    p.fill(0, 180, 255);
    p.circle(0, 0, 8);
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
