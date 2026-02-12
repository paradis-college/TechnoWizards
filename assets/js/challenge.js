// FLL Challenge Mission Animation
let challengeBot;
let artifacts = [];
let museumZone;
let startZone;
let missionState = 'moving_to_artifact'; // states: moving_to_artifact, collecting, returning, depositing, complete
let currentArtifact = 0;
let collectedArtifacts = 0;
let animationProgress = 0;
let fieldGrid = [];

function setup() {
  const canvas = createCanvas(500, 400);
  canvas.parent("challenge-canvas");

  // Initialize robot
  challengeBot = {
    x: 50,
    y: 350,
    angle: 0,
    targetX: 50,
    targetY: 350,
    speed: 2,
    armExtended: false,
    armAngle: 0,
    carrying: null
  };

  // Start zone (home base)
  startZone = {
    x: 30,
    y: 330,
    w: 60,
    h: 60
  };

  // Museum zone (scoring area)
  museumZone = {
    x: 400,
    y: 50,
    w: 80,
    h: 80,
    artifacts: []
  };

  // Create artifacts to collect
  artifacts = [
    { x: 150, y: 100, collected: false, scored: false, type: '🏺', name: 'Vase' },
    { x: 300, y: 200, collected: false, scored: false, type: '🗿', name: 'Statue' },
    { x: 200, y: 300, collected: false, scored: false, type: '📿', name: 'Jewelry' }
  ];

  // Field grid lines
  for (let i = 0; i <= 5; i++) {
    fieldGrid.push(i * 100);
  }
}

function draw() {
  // Field background
  background(20, 30, 40);
  
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
}

function drawFieldGrid() {
  stroke(0, 180, 255, 30);
  strokeWeight(1);
  
  // Vertical lines
  for (let x of fieldGrid) {
    line(x, 0, x, height);
  }
  
  // Horizontal lines
  for (let y of fieldGrid) {
    line(0, y, width, y);
  }
  
  // Border
  stroke(168, 85, 247, 100);
  strokeWeight(3);
  noFill();
  rect(10, 10, width - 20, height - 20);
}

function drawZones() {
  // Start zone
  fill(0, 180, 255, 30);
  stroke(0, 180, 255);
  strokeWeight(2);
  rect(startZone.x, startZone.y, startZone.w, startZone.h, 5);
  
  noStroke();
  fill(0, 180, 255);
  textSize(12);
  textAlign(CENTER);
  text('START', startZone.x + startZone.w / 2, startZone.y + startZone.h / 2 + 5);
  
  // Museum zone
  fill(255, 215, 0, 30);
  stroke(255, 215, 0);
  strokeWeight(2);
  rect(museumZone.x, museumZone.y, museumZone.w, museumZone.h, 5);
  
  noStroke();
  fill(255, 215, 0);
  textSize(12);
  text('MUSEUM', museumZone.x + museumZone.w / 2, museumZone.y + 20);
  
  // Draw scored artifacts in museum
  museumZone.artifacts.forEach((artifact, i) => {
    textSize(24);
    text(artifact.type, museumZone.x + 20 + i * 25, museumZone.y + 60);
  });
}

function drawArtifacts() {
  artifacts.forEach((artifact, index) => {
    if (!artifact.collected && !artifact.scored) {
      // Artifact platform
      noStroke();
      fill(168, 85, 247, 40);
      ellipse(artifact.x, artifact.y, 40, 40);
      
      // Artifact with glow
      if (index === currentArtifact) {
        fill(255, 215, 0, 50);
        ellipse(artifact.x, artifact.y, 50 + sin(frameCount * 0.1) * 5, 50 + sin(frameCount * 0.1) * 5);
      }
      
      // Artifact icon
      textSize(32);
      textAlign(CENTER, CENTER);
      text(artifact.type, artifact.x, artifact.y);
      
      // Label
      fill(168, 85, 247);
      textSize(10);
      text(artifact.name, artifact.x, artifact.y + 30);
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
          if (dist(challengeBot.x, challengeBot.y, artifact.x, artifact.y) < 5) {
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
      challengeBot.armAngle = lerp(0, PI / 2, min(animationProgress, 1));
      
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
      if (dist(challengeBot.x, challengeBot.y, challengeBot.targetX, challengeBot.targetY) < 10) {
        missionState = 'depositing';
        animationProgress = 0;
      }
      break;
      
    case 'depositing':
      animationProgress += 0.02;
      challengeBot.armAngle = lerp(PI / 2, 0, min(animationProgress, 1));
      
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
      if (dist(challengeBot.x, challengeBot.y, challengeBot.targetX, challengeBot.targetY) < 10) {
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
  let distance = sqrt(dx * dx + dy * dy);
  
  if (distance > 1) {
    challengeBot.angle = atan2(dy, dx);
    challengeBot.x += (dx / distance) * challengeBot.speed;
    challengeBot.y += (dy / distance) * challengeBot.speed;
  }
}

function drawChallengeBot() {
  push();
  translate(challengeBot.x, challengeBot.y);
  rotate(challengeBot.angle);
  
  // Bot trail
  noStroke();
  fill(0, 180, 255, 20);
  ellipse(-10, 0, 20, 20);
  
  // Bot glow
  fill(168, 85, 247, 40);
  ellipse(0, 0, 40, 40);
  
  // Bot body
  fill(0, 120, 255);
  stroke(0, 180, 255);
  strokeWeight(2);
  rect(-15, -12, 30, 24, 4);
  
  // Wizard hat
  fill(168, 85, 247);
  noStroke();
  triangle(-18, -12, 18, -12, 0, -30);
  fill(147, 51, 234);
  rect(-20, -12, 40, 5);
  
  // Hat star
  fill(255, 215, 0);
  textSize(12);
  textAlign(CENTER);
  text('✨', 0, -22);
  
  // Robot arm
  if (challengeBot.armExtended) {
    stroke(0, 180, 255);
    strokeWeight(3);
    push();
    rotate(challengeBot.armAngle);
    line(12, 0, 25, 0);
    
    // Gripper
    noStroke();
    fill(255, 215, 0);
    ellipse(25, 0, 8, 8);
    pop();
  }
  
  // Eyes
  fill(255);
  noStroke();
  ellipse(-6, -4, 4, 4);
  ellipse(6, -4, 4, 4);
  
  // Front indicator
  fill(0, 255, 200);
  triangle(12, -6, 12, 6, 20, 0);
  
  // Carrying artifact
  if (challengeBot.carrying) {
    textSize(20);
    text(challengeBot.carrying.type, 25, -15);
  }
  
  pop();
}

function drawMissionInfo() {
  fill(0, 180, 255);
  noStroke();
  textSize(14);
  textAlign(LEFT);
  
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
  
  text(`Status: ${statusText}`, 10, height - 60);
  text(`Artifacts Collected: ${collectedArtifacts}/3`, 10, height - 40);
  
  fill(255, 215, 0);
  text(`Points: ${collectedArtifacts * 20}`, 10, height - 20);
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
