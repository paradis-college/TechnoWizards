// Team member data
const teamData = {
  ilinca: {
    name: "Ilinca Olaru",
    role: "👑 Team Leader",
    image: "assets/images/portrait/ilinca.jpg",
    activities: [
      "Leads team meetings and coordinates project timelines",
      "Oversees competition strategy and team dynamics",
      "Manages communication with coaches and mentors",
      "Ensures all competition requirements are met"
    ],
    values: [
      { value: "Teamwork", description: "Brings the team together and ensures everyone's voice is heard" },
      { value: "Impact", description: "Drives the team towards meaningful goals and achievements" },
      { value: "Professionalism", description: "Maintains high standards and represents the team with integrity" }
    ],
    achievements: [
      "Successfully led team through multiple competition seasons",
      "Coordinated award-winning innovation projects",
      "Built strong team culture of collaboration and respect"
    ]
  },
  maria: {
    name: "Maria Parasca",
    role: "💻 Coder & 🛠 Builder",
    image: "assets/images/portrait/maria.jpg",
    activities: [
      "Programs robot behaviors and autonomous routines",
      "Designs and builds mechanical attachments",
      "Debugs code and optimizes robot performance",
      "Tests robot missions on practice field"
    ],
    values: [
      { value: "Innovation", description: "Creates unique coding solutions for complex challenges" },
      { value: "Learning", description: "Constantly experiments with new programming techniques" },
      { value: "Fun", description: "Makes coding sessions enjoyable and engaging" }
    ],
    achievements: [
      "Developed efficient autonomous navigation algorithms",
      "Built custom attachments for multiple missions",
      "Optimized robot code for maximum speed and accuracy"
    ]
  },
  elisabeta: {
    name: "Elisabeta Bura",
    role: "💻 Coder & 📊 Project Manager",
    image: "assets/images/portrait/elisabeta.jpg",
    activities: [
      "Manages innovation project research and development",
      "Codes sensor integration and data collection",
      "Organizes project documentation and presentations",
      "Tracks milestones and deadlines"
    ],
    values: [
      { value: "Innovation", description: "Brings creative solutions to both coding and project management" },
      { value: "Teamwork", description: "Coordinates between different team roles effectively" },
      { value: "Impact", description: "Ensures projects have real-world applications" }
    ],
    achievements: [
      "Led award-winning innovation project presentations",
      "Implemented advanced sensor systems",
      "Created comprehensive project documentation"
    ]
  },
  alexia: {
    name: "Alexia Diaconita",
    role: "📊 Project Manager & 🎯 Mission Strategist",
    image: "assets/images/portrait/alexia.jpg",
    activities: [
      "Plans mission run strategies and sequences",
      "Manages innovation project timelines",
      "Analyzes competition field and scoring opportunities",
      "Coordinates team preparation for tournaments"
    ],
    values: [
      { value: "Learning", description: "Studies competition rules and strategies thoroughly" },
      { value: "Innovation", description: "Develops creative mission approaches" },
      { value: "Professionalism", description: "Maintains organized project management" }
    ],
    achievements: [
      "Developed high-scoring mission strategies",
      "Optimized robot run sequences for maximum points",
      "Successfully managed complex project timelines"
    ]
  },
  david: {
    name: "David Hriticu",
    role: "🛠 Builder & 🔍 Researcher",
    image: "assets/images/portrait/david.jpg",
    activities: [
      "Designs and constructs robot chassis and mechanisms",
      "Researches real-world problems for innovation project",
      "Tests mechanical designs for durability",
      "Creates prototypes for new attachments"
    ],
    values: [
      { value: "Innovation", description: "Designs creative mechanical solutions" },
      { value: "Learning", description: "Researches engineering principles and best practices" },
      { value: "Teamwork", description: "Collaborates with coders to integrate mechanics and software" }
    ],
    achievements: [
      "Built robust robot chassis with excellent stability",
      "Researched and presented innovative solutions",
      "Created multiple successful mission attachments"
    ]
  },
  eduard: {
    name: "Eduard Grigoruta",
    role: "💻 Coder & 🎯 Mission Strategist",
    image: "assets/images/portrait/eduard.jpg",
    activities: [
      "Programs complex autonomous missions",
      "Analyzes mission requirements and scoring",
      "Optimizes code for precision and reliability",
      "Tests and refines robot strategies"
    ],
    values: [
      { value: "Innovation", description: "Develops cutting-edge programming techniques" },
      { value: "Learning", description: "Masters new coding concepts and tools" },
      { value: "Impact", description: "Focuses on solutions that maximize scoring" }
    ],
    achievements: [
      "Created highly accurate mission programs",
      "Developed reusable code libraries for the team",
      "Achieved consistent high scores in competitions"
    ]
  },
  rares: {
    name: "Rares Mazilu",
    role: "💻 Coder & 🛠 Builder",
    image: "assets/images/portrait/rares.jpg",
    activities: [
      "Programs robot movements and sensor readings",
      "Builds and tests mechanical mechanisms",
      "Integrates hardware and software systems",
      "Troubleshoots technical issues"
    ],
    values: [
      { value: "Teamwork", description: "Works seamlessly with both builders and coders" },
      { value: "Innovation", description: "Combines mechanical and software solutions creatively" },
      { value: "Fun", description: "Brings enthusiasm to every build and coding session" }
    ],
    achievements: [
      "Developed innovative attachment designs",
      "Created efficient code for complex missions",
      "Successfully integrated multiple robot systems"
    ]
  },
  alexandru: {
    name: "Alexandru Bucataru",
    role: "🔍 Researcher & 💻 Coder",
    image: "assets/images/portrait/alexandru.jpg",
    activities: [
      "Conducts in-depth research for innovation projects",
      "Programs data analysis and visualization tools",
      "Documents findings and technical processes",
      "Supports coding for robot missions"
    ],
    values: [
      { value: "Learning", description: "Deeply investigates topics and shares knowledge" },
      { value: "Innovation", description: "Applies research to create novel solutions" },
      { value: "Professionalism", description: "Maintains thorough documentation" }
    ],
    achievements: [
      "Conducted comprehensive research for projects",
      "Developed data collection and analysis programs",
      "Created detailed technical documentation"
    ]
  }
};

// Get modal elements
const modal = document.getElementById('teamModal');
const closeBtn = document.querySelector('.close');
const teamCards = document.querySelectorAll('.team-card');

// Add click event to each team card
teamCards.forEach(card => {
  card.addEventListener('click', () => {
    const memberId = card.dataset.member;
    const memberData = teamData[memberId];
    
    if (memberData) {
      showMemberDetails(memberData);
      
      // Add magical entrance animation
      modal.style.display = 'block';
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
    }
  });
  
  // Add hover effect
  card.addEventListener('mouseenter', () => {
    const sparkle = card.querySelector('.magic-sparkle');
    sparkle.style.animation = 'sparkle 0.6s ease-in-out';
  });
  
  card.addEventListener('mouseleave', () => {
    const sparkle = card.querySelector('.magic-sparkle');
    sparkle.style.animation = '';
  });
});

// Close modal
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function showMemberDetails(member) {
  document.getElementById('modalName').textContent = member.name;
  document.getElementById('modalRole').textContent = member.role;
  document.getElementById('modalImage').src = member.image;
  document.getElementById('modalImage').onerror = function() {
    this.src = `https://via.placeholder.com/300/0077ff/ffffff?text=${member.name.split(' ')[0]}`;
  };
  
  // Activities
  const activitiesHtml = member.activities
    .map(activity => `<div class="activity-item">⚡ ${activity}</div>`)
    .join('');
  document.getElementById('modalActivities').innerHTML = activitiesHtml;
  
  // Values
  const valuesHtml = member.values
    .map(v => `
      <div class="value-item">
        <strong>🔮 ${v.value}:</strong>
        <p>${v.description}</p>
      </div>
    `)
    .join('');
  document.getElementById('modalValues').innerHTML = valuesHtml;
  
  // Achievements
  const achievementsHtml = member.achievements
    .map(achievement => `<div class="achievement-item">🏆 ${achievement}</div>`)
    .join('');
  document.getElementById('modalAchievements').innerHTML = achievementsHtml;
}

function closeModal() {
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Add escape key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    closeModal();
  }
});

// Add animated particles on card hover
teamCards.forEach(card => {
  card.addEventListener('mouseenter', function(e) {
    createHoverParticles(this);
  });
});

function createHoverParticles(card) {
  const rect = card.getBoundingClientRect();
  
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement('div');
    particle.className = 'hover-particle';
    particle.style.left = rect.left + rect.width / 2 + 'px';
    particle.style.top = rect.top + rect.height / 2 + 'px';
    
    const angle = (Math.PI * 2 * i) / 6;
    const velocity = 1.5;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    particle.style.setProperty('--vx', vx);
    particle.style.setProperty('--vy', vy);
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 800);
  }
}
