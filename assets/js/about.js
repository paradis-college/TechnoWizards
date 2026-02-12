// Expandable sections
const expandables = document.querySelectorAll('.expandable');

expandables.forEach(card => {
  const header = card.querySelector('h2');
  const hiddenContent = card.querySelector('.hidden-content');
  const preview = card.querySelector('.preview');
  const icon = card.querySelector('.expand-icon');

  // Initialize the card as not expanded
  hiddenContent.style.maxHeight = '0';
  preview.style.display = 'block';
  icon.textContent = '+';

  header.addEventListener('click', () => {
    // Close all other expandables first
    expandables.forEach(otherCard => {
      if (otherCard !== card && otherCard.classList.contains('expanded')) {
        const otherHidden = otherCard.querySelector('.hidden-content');
        const otherPreview = otherCard.querySelector('.preview');
        const otherIcon = otherCard.querySelector('.expand-icon');
        otherCard.classList.remove('expanded');
        otherHidden.style.maxHeight = '0';
        otherPreview.style.display = 'block';
        otherIcon.textContent = '+';
      }
    });

    // Toggle this card
    card.classList.toggle('expanded');

    if (card.classList.contains('expanded')) {
      hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
      preview.style.display = 'none';
      icon.textContent = '−';
    } else {
      hiddenContent.style.maxHeight = '0';
      preview.style.display = 'block';
      icon.textContent = '+';
    }
  });
});

// Interactive value cards with flip effect
const valueCards = document.querySelectorAll('.value');

valueCards.forEach(card => {
  card.addEventListener('click', () => {
    // Close all other flipped cards
    valueCards.forEach(otherCard => {
      if (otherCard !== card && otherCard.classList.contains('flipped')) {
        otherCard.classList.remove('flipped');
      }
    });

    // Toggle flip
    card.classList.toggle('flipped');

    // Add magical particle effect on click
    if (card.classList.contains('flipped')) {
      createMagicParticles(card);
    }
  });
});

// Create magical particles on interaction
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

// Add hover effects with sound visualization
valueCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.05)';
  });

  card.addEventListener('mouseleave', () => {
    if (!card.classList.contains('flipped')) {
      card.style.transform = '';
    }
  });
});
