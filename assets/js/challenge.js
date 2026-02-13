// FLL Challenge Mission Animation
const challengeSketch = p => {
let challengeBot;
let artifacts = [];
let museumZone;
let startZone;
let missionState = 'moving_to_artifact'; // states: moving_to_artifact, collecting, returning, depositing, complete
let currentArtifact = 0;
let collectedArtifacts = 0;
let animationProgress = 0;
let fieldGrid = [];

p.setup = () => {
  const canvas = p.createCanvas(400, 320);
  canvas.parent("challenge-canvas");

  // Initialize robot
  challengeBot = {
    x: 40,
    y: 280,
    angle: 0,
    targetX: 40,
    targetY: 280,
    speed: 2,
    armExtended: false,
    armAngle: 0,
    carrying: null
  };

  // Start zone (home base)
  startZone = {
    x: 24,
    y: 264,
    w: 48,
    h: 48
  };

  // Museum zone (scoring area)
  museumZone = {
    x: 320,
    y: 40,
    w: 64,
    h: 64,
    artifacts: []
  };

  // Create artifacts to collect
  artifacts = [
    { x: 120, y: 80, collected: false, scored: false, type: '🏺', name: 'Vase' },
    { x: 240, y: 160, collected: false, scored: false, type: '🗿', name: 'Statue' },
    { x: 160, y: 240, collected: false, scored: false, type: '📿', name: 'Jewelry' }
  ];

  // Field grid lines
  for (let i = 0; i <= 4; i++) {
    fieldGrid.push(i * 80);
  }
};

p.draw = () => {
  // Field background
  p.background(20, 30, 40);

  // Draw grid
  drawFieldGrid();

  // Draw zones
  drawZones();

  // Draw artifacts
  drawArtifacts();

  // Update and draw robot
  updateChallengeBotBehavior();
  drawChallengeBot();

  // Draw mission info
  drawMissionInfo();
};

function drawFieldGrid() {
  p.stroke(0, 180, 255, 30);
  p.strokeWeight(1);

  // Vertical lines
  for (let x of fieldGrid) {
    p.line(x, 0, x, p.height);
  }

  // Horizontal lines
  for (let y of fieldGrid) {
    p.line(0, y, p.width, y);
  }

  // Border
  p.stroke(168, 85, 247, 100);
  p.strokeWeight(3);
  p.noFill();
  p.rect(8, 8, p.width - 16, p.height - 16);
}

function drawZones() {
  // Start zone
  p.fill(0, 180, 255, 30);
  p.stroke(0, 180, 255);
  p.strokeWeight(2);
  p.rect(startZone.x, startZone.y, startZone.w, startZone.h, 5);

  p.noStroke();
  p.fill(0, 180, 255);
  p.textSize(10);
  p.textAlign(p.CENTER);
  p.text('START', startZone.x + startZone.w / 2, startZone.y + startZone.h / 2 + 4);

  // Museum zone
  p.fill(255, 215, 0, 30);
  p.stroke(255, 215, 0);
  p.strokeWeight(2);
  p.rect(museumZone.x, museumZone.y, museumZone.w, museumZone.h, 5);

  p.noStroke();
  p.fill(255, 215, 0);
  p.textSize(10);
  p.text('MUSEUM', museumZone.x + museumZone.w / 2, museumZone.y + 16);

  // Draw scored artifacts in museum
  museumZone.artifacts.forEach((artifact, i) => {
    p.textSize(20);
    p.text(artifact.type, museumZone.x + 16 + i * 20, museumZone.y + 48);
  });
}

function drawArtifacts() {
  artifacts.forEach((artifact, index) => {
    if (!artifact.collected && !artifact.scored) {
      // Artifact platform
      p.noStroke();
      p.fill(168, 85, 247, 40);
      p.ellipse(artifact.x, artifact.y, 32, 32);

      // Artifact with glow
      if (index === currentArtifact) {
        p.fill(255, 215, 0, 50);
        p.ellipse(artifact.x, artifact.y, 40 + p.sin(p.frameCount * 0.1) * 4, 40 + p.sin(p.frameCount * 0.1) * 4);
      }

      // Artifact icon
      p.textSize(26);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(artifact.type, artifact.x, artifact.y);

      // Label
      p.fill(168, 85, 247);
      p.textSize(9);
      p.text(artifact.name, artifact.x, artifact.y + 24);
    }
  });
}

function updateChallengeBotBehavior() {
  switch (missionState) {
    case 'moving_to_artifact':
      if (currentArtifact < artifacts.length) {
        let artifact = artifacts[currentArtifact];
        if (!artifact.scored) {
          challengeBot.targetX = artifact.x;
          challengeBot.targetY = artifact.y;

          moveToTarget();

          // Check if reached artifact
          if (p.dist(challengeBot.x, challengeBot.y, artifact.x, artifact.y) < 5) {
            missionState = 'collecting';
            animationProgress = 0;
          }
        } else {
          currentArtifact++;
          if (currentArtifact >= artifacts.length) {
            missionState = 'complete';
          }
        }
      } else {
        missionState = 'complete';
      }
      break;

    case 'collecting':
      animationProgress += 0.02;
      challengeBot.armExtended = true;
      challengeBot.armAngle = p.lerp(0, p.PI / 2, p.min(animationProgress, 1));

      if (animationProgress >= 1) {
        artifacts[currentArtifact].collected = true;
        challengeBot.carrying = artifacts[currentArtifact];
        missionState = 'returning';
        animationProgress = 0;
      }
      break;

    case 'returning':
      challengeBot.targetX = museumZone.x + museumZone.w / 2;
      challengeBot.targetY = museumZone.y + museumZone.h / 2;

      moveToTarget();

      // Check if reached museum
      if (p.dist(challengeBot.x, challengeBot.y, challengeBot.targetX, challengeBot.targetY) < 10) {
        missionState = 'depositing';
        animationProgress = 0;
      }
      break;

    case 'depositing':
      animationProgress += 0.02;
      challengeBot.armAngle = p.lerp(p.PI / 2, 0, p.min(animationProgress, 1));

      if (animationProgress >= 1) {
        // Score the artifact
        artifacts[currentArtifact].scored = true;
        museumZone.artifacts.push(challengeBot.carrying);
        challengeBot.carrying = null;
        challengeBot.armExtended = false;
        collectedArtifacts++;
        currentArtifact++;

        if (currentArtifact >= artifacts.length) {
          missionState = 'complete';
        } else {
          missionState = 'moving_to_artifact';
        }
      }
      break;

    case 'complete':
      // Return to start
      challengeBot.targetX = startZone.x + startZone.w / 2;
      challengeBot.targetY = startZone.y + startZone.h / 2;
      moveToTarget();

      // Check if back at start
      if (p.dist(challengeBot.x, challengeBot.y, challengeBot.targetX, challengeBot.targetY) < 10) {
        // Reset for another run
        setTimeout(() => {
          resetMission();
        }, 2000);
      }
      break;
  }
}

function moveToTarget() {
  let dx = challengeBot.targetX - challengeBot.x;
  let dy = challengeBot.targetY - challengeBot.y;
  let distance = p.sqrt(dx * dx + dy * dy);

  if (distance > 1) {
    challengeBot.angle = p.atan2(dy, dx);
    challengeBot.x += (dx / distance) * challengeBot.speed;
    challengeBot.y += (dy / distance) * challengeBot.speed;
  }
}

function drawChallengeBot() {
  p.push();
  p.translate(challengeBot.x, challengeBot.y);
  p.rotate(challengeBot.angle);

  // Bot trail
  p.noStroke();
  p.fill(0, 180, 255, 20);
  p.ellipse(-8, 0, 16, 16);

  // Bot glow
  p.fill(168, 85, 247, 40);
  p.ellipse(0, 0, 32, 32);

  // Bot body
  p.fill(0, 120, 255);
  p.stroke(0, 180, 255);
  p.strokeWeight(2);
  p.rect(-12, -10, 24, 20, 3);

  // Wizard hat
  p.fill(168, 85, 247);
  p.noStroke();
  p.triangle(-14, -10, 14, -10, 0, -24);
  p.fill(147, 51, 234);
  p.rect(-16, -10, 32, 4);

  // Hat star
  p.fill(255, 215, 0);
  p.textSize(10);
  p.textAlign(p.CENTER);
  p.text('✨', 0, -18);

  // Robot arm
  if (challengeBot.armExtended) {
    p.stroke(0, 180, 255);
    p.strokeWeight(3);
    p.push();
    p.rotate(challengeBot.armAngle);
    p.line(10, 0, 20, 0);

    // Gripper
    p.noStroke();
    p.fill(255, 215, 0);
    p.ellipse(20, 0, 6, 6);
    p.pop();
  }

  // Eyes
  p.fill(255);
  p.noStroke();
  p.ellipse(-5, -3, 3, 3);
  p.ellipse(5, -3, 3, 3);

  // Front indicator
  p.fill(0, 255, 200);
  p.triangle(10, -5, 10, 5, 16, 0);

  // Carrying artifact
  if (challengeBot.carrying) {
    p.textSize(16);
    p.text(challengeBot.carrying.type, 20, -12);
  }

  p.pop();
}

function drawMissionInfo() {
  p.fill(0, 180, 255);
  p.noStroke();
  p.textSize(11);
  p.textAlign(p.LEFT);

  let statusText = '';
  switch (missionState) {
    case 'moving_to_artifact':
      statusText = 'Moving to artifact...';
      break;
    case 'collecting':
      statusText = 'Collecting artifact...';
      break;
    case 'returning':
      statusText = 'Returning to museum...';
      break;
    case 'depositing':
      statusText = 'Depositing artifact...';
      break;
    case 'complete':
      statusText = 'Mission complete! Returning home...';
      break;
  }

  p.text(`Status: ${statusText}`, 10, p.height - 48);
  p.text(`Artifacts Collected: ${collectedArtifacts}/3`, 10, p.height - 32);

  p.fill(255, 215, 0);
  p.text(`Points: ${collectedArtifacts * 20}`, 10, p.height - 16);
}

function resetMission() {
  // Reset all artifacts
  artifacts.forEach(artifact => {
    artifact.collected = false;
    artifact.scored = false;
  });

  // Reset museum
  museumZone.artifacts = [];

  // Reset robot
  challengeBot.x = startZone.x + startZone.w / 2;
  challengeBot.y = startZone.y + startZone.h / 2;
  challengeBot.carrying = null;
  challengeBot.armExtended = false;

  // Reset mission state
  currentArtifact = 0;
  collectedArtifacts = 0;
  missionState = 'moving_to_artifact';
}

};

new p5(challengeSketch);
