// Robot page script: add visual effects similar to other pages

// Reveal details when scrolled into view
const detailSection = document.querySelector('.robot-details');
if (detailSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(detailSection);
}

// Optional: simple hover animation on robot image
// target by class for consistency with About page
const robotImg = document.querySelector('.robot-img') || document.querySelector('.robot-details img');
if (robotImg) {
  robotImg.addEventListener('mouseenter', () => {
    robotImg.style.transform = 'scale(1.02)';
  });
  robotImg.addEventListener('mouseleave', () => {
    robotImg.style.transform = '';
  });
  robotImg.addEventListener('click', () => {
    createMagicParticles(robotImg);
  });
}

// Particle effect helper (same as in about.js)
function createMagicParticles(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.className = 'magic-particle';
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';

    const angle = (Math.PI * 2 * i) / 12;
    const velocity = 2 + Math.random() * 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    particle.style.setProperty('--vx', vx);
    particle.style.setProperty('--vy', vy);

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1000);
  }
}
