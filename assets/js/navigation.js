let bot;

function setup() {
  const canvas = createCanvas(500, 400);
  canvas.parent("nav-canvas");
  bot = { x: 250, y: 200, angle: 0 };
}

function draw() {
  background(10);

  // Obstacle
  fill(255, 80, 80);
  rect(220, 100, 60, 60);

  // Bot
  push();
  translate(bot.x, bot.y);
  rotate(bot.angle);
  fill(0, 180, 255);
  triangle(-8, -6, -8, 6, 12, 0);
  pop();

  // Simple avoidance logic
  if (bot.x > 210 && bot.x < 290 && bot.y < 180) {
    bot.angle += 0.05;
  } else {
    bot.x += cos(bot.angle) * 1.2;
    bot.y += sin(bot.angle) * 1.2;
  }
}
