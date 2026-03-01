// Language Switcher Module
const LanguageSwitcher = {
  currentLanguage: localStorage.getItem('language') || 'en',
  
  translations: {
    en: {
      home: 'Home',
      about: 'About',
      team: 'Team',
      project: 'Project',
      contact: 'Contact',
      explore: 'Explore Our World',
      innovation: 'Innovation Project',
      whoAreWizards: '🧙‍♂️ Who Are the Techno Wizards? 🤖',
      ideas: 'We turn ideas into robots and challenges into innovation.',
      meetWizards: '✨ Meet the Wizards ✨',
      meetMore: 'Click on any team member to learn more about their magical powers!',
      robotMagic: '🔮 Innovation & Robot Magic 🤖',
      intersection: 'Exploring the intersection of ancient wisdom and modern technology',
      contactWizards: '🔮 Contact the Techno Wizards 🤖',
      contactReach: 'Reach out to collaborate, ask questions, or learn more about our magical robotics journey!',
      technoWizards: 'TECHNO WIZARDS',
      magic: '⚡ Where Magic Meets Robotics ⚡'
    },
    ro: {
      home: 'Acasă',
      about: 'Despre',
      team: 'Echipă',
      project: 'Proiect',
      contact: 'Contact',
      explore: 'Explorează Lumea Noastră',
      innovation: 'Proiect de Inovație',
      whoAreWizards: '🧙‍♂️ Cine sunt Vrăjitorii Tehnologiei? 🤖',
      ideas: 'Transformăm ideile în roboți și provocări în inovație.',
      meetWizards: '✨ Întâlnește Vrăjitorii ✨',
      meetMore: 'Dă click pe orice membru al echipei pentru a afla mai mult despre puterile magice ale acestora!',
      robotMagic: '🔮 Magia Inovării și Roboților 🤖',
      intersection: 'Explorând intersecția dintre înțelepciunea antică și tehnologia modernă',
      contactWizards: '🔮 Contactează Vrăjitorii Tehnologiei 🤖',
      contactReach: 'Contactează-ne pentru a colabora, pentru a pune întrebări sau pentru a afla mai multe despre jurneyul nostru magic în robotică!',
      technoWizards: 'TECHNO WIZARDS',
      magic: '⚡ Unde Magia Întâlnește Robotica ⚡'
    }
  },

  init() {
    this.setLanguage(this.currentLanguage);
    this.createLanguageSwitcher();
  },

  createLanguageSwitcher() {
    // Check if switcher already exists
    if (document.getElementById('language-switcher')) return;

    const switcher = document.createElement('div');
    switcher.id = 'language-switcher';
    switcher.className = 'language-switcher';
    switcher.innerHTML = `
      <button class="lang-btn lang-btn-en ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
        🇬🇧 EN
      </button>
      <button class="lang-btn lang-btn-ro ${this.currentLanguage === 'ro' ? 'active' : ''}" data-lang="ro">
        🇷🇴 RO
      </button>
    `;

    document.body.insertBefore(switcher, document.body.firstChild);

    // Add event listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });
  },

  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      }
    });

    // Update navigation
    this.updateNav();
    
    // Update page content
    this.updatePageContent();
  },

  updateNav() {
    const navLinks = {
      '[href="index.html"]': this.translations[this.currentLanguage].home,
      '[href="about.html"]': this.translations[this.currentLanguage].about,
      '[href="team.html"]': this.translations[this.currentLanguage].team,
      '[href="project.html"]': this.translations[this.currentLanguage].project,
      '[href="contact.html"]': this.translations[this.currentLanguage].contact
    };

    Object.entries(navLinks).forEach(([selector, text]) => {
      const link = document.querySelector(`.top-nav a${selector}`);
      if (link) {
        link.textContent = text;
      }
    });
  },

  updatePageContent() {
    // Update all elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (this.translations[this.currentLanguage][key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = this.translations[this.currentLanguage][key];
        } else {
          element.textContent = this.translations[this.currentLanguage][key];
        }
      }
    });

    // Update elements with data-i18n-html for content with HTML
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      if (this.translations[this.currentLanguage][key]) {
        element.innerHTML = this.translations[this.currentLanguage][key];
      }
    });
  },

  t(key) {
    return this.translations[this.currentLanguage][key] || key;
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  LanguageSwitcher.init();
});
