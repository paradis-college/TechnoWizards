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
      robot: 'Robot',
      // Home page
      technoWizards: 'TECHNO WIZARDS',
      whereMagic: '⚡ Where Magic Meets Robotics ⚡',
      exploreWorld: 'Explore Our World',
      innovationProj: 'Innovation Project',
      // About page
      ourMission: '🧠 Our Mission',
      missionText: 'We are an 8-member FIRST LEGO League team driven by curiosity, teamwork, and engineering excellence. Our mission is to solve real-world problems using robotics, creativity, and science.',
      ourHistory: '📜 Our History',
      historyText: 'This is our second year competing in FIRST LEGO League, and we\'re thrilled to announce that we have passed the regionals! This milestone reflects our team\'s dedication, hard work, and passion for robotics and innovation.',
      fllTitle: '⚙ FIRST LEGO League',
      fllText: 'FIRST LEGO League combines robotics, research, and innovation to help students develop critical thinking, collaboration, and technical skills. We compete in challenges that test our engineering, programming, and problem-solving abilities.',
      ourRobotAbout: '🤖 Our Robot',
      robotAboutText: 'Built on the SPIKE Prime platform, this robot drives our missions autonomously in FLL competitions.',
      ourApproach: '🔬 Our Approach',
      approachPreview: 'Click to discover our methodology...',
      researchInnovation: 'Research & Innovation',
      researchText: 'We dive deep into real-world problems, researching historical and modern solutions to create innovative approaches.',
      robotEngineering: 'Robot Engineering',
      engineeringText: 'We design, build, and program autonomous robots using LEGO SPIKE Prime, combining mechanical design with advanced coding.',
      teamCollaboration: 'Team Collaboration',
      collaborationText: 'Every member brings unique skills - from coding and building to strategy and presentation - working together as a cohesive unit.',
      competitionElements: '🏆 Competition Elements',
      competitionPreview: 'Learn how we compete...',
      robotGame: 'Robot Game',
      robotGameText: 'Autonomous robot completing themed missions on a competition mat.',
      innovationProject: 'Innovation Project',
      innovationProjectText: 'Research and solve real problems with creative solutions.',
      robotDesign: 'Robot Design',
      robotDesignText: 'Explain our engineering choices and programming strategies.',
      coreValuesLabel: 'Core Values',
      coreValuesText: 'Demonstrate teamwork, respect, and gracious professionalism.',
      coreValues: '🌟 Our Core Values',
      coreValuesSubtitle: 'Click each value to learn more about our team!',
      teamworkLabel: 'Teamwork',
      teamworkBack: 'Together We Achieve More',
      teamworkDesc: 'Our team meets weekly, brainstorms solutions, and supports each other. Every voice matters!',
      innovationLabel: 'Innovation',
      innovationBack: 'Creative Problem Solving',
      innovationDesc: 'We think outside the box, combining magic and technology to create unique robot solutions.',
      learningLabel: 'Learning',
      learningBack: 'Continuous Growth',
      learningDesc: 'Every challenge is a learning opportunity. We research, experiment, and improve constantly.',
      professionalismLabel: 'Gracious Professionalism',
      professionalismBack: 'Respect & Integrity',
      professionalismDesc: 'We compete fiercely but treat all teams with kindness and respect, celebrating everyone\'s success.',
      impactLabel: 'Impact',
      impactBack: 'Making a Difference',
      impactDesc: 'Our projects aim to solve real problems and positively impact our community and beyond.',
      funLabel: 'Fun',
      funBack: 'Joy in Discovery',
      funDesc: 'We love what we do! Robotics is exciting, and we celebrate every milestone with enthusiasm.',
      // Project page
      innovationRobot: '🔮 Innovation & Robot Magic 🤖',
      ancientModern: 'Exploring the intersection of ancient wisdom and modern technology',
      robotDemonstrations: '🎯 Robot Demonstrations',
      interactiveVis: 'Interactive visualizations of our robot\'s capabilities',
      lidarScanning: '📡 LiDAR Scanning',
      lidarText: 'Our robot uses LiDAR sensors to emit laser rays in multiple directions. Each ray measures the distance to nearby obstacles, allowing the robot to detect walls even in complete darkness. This technology is inspired by archaeological cave exploration, where traditional light-based vision fails. By mapping the environment through distance measurement, we uncover hidden spaces - just like archaeologists uncover history.',
      autonomousNav: '🧭 Autonomous Navigation',
      navText: 'Based on LiDAR data, our robot calculates optimal paths through complex environments. It uses advanced algorithms to detect obstacles, identify free space, and make real-time navigation decisions. Our navigation system combines sensor data with pathfinding algorithms, allowing the robot to explore unknown territories autonomously - similar to how archaeologists systematically explore dig sites.',
      artifactChallenge: '🏺 Artifact Collection Challenge',
      artifactSubtitle: 'Watch our robot collect and transport archaeological artifacts',
      missionSimulation: '⛏️ Mission Simulation',
      missionText: 'In the UNEARTHED™ challenge, our robot must carefully collect artifacts from various locations on the field and transport them to designated zones. This requires precise positioning, gentle handling, and strategic planning. This animation demonstrates one of our key missions: collecting artifacts and delivering them to the museum zone. Watch as the robot navigates the field, picks up artifacts, and scores points by placing them in the correct location.',
      challenge: '🔬 The Challenge',
      challengeText: 'UNEARTHED™ is the 2025-26 FLL Challenge theme, where we explore how tools, innovations, and works of art connect us to people and ideas from history. Inspired by archaeology, we investigate historical problems and apply modern STEM solutions.',
      robotGameProject: '🤖 Robot Game',
      robotGameProjectText: 'Our autonomous LEGO robot completes ~15 missions on a themed field, each tied to archaeological tasks. We design, build, and program using SPIKE™ Prime to score maximum points through strategic engineering and precise coding.',
      innovationProjectSection: '💡 Innovation Project',
      innovationProjectText: 'We research real problems related to archaeology and historical discovery, developing solutions that make a tangible difference.',
      // Robot page
      ourRobot: '🤖 Our FLL SPIKE™ Prime Robot',
      robotDescription: 'The heart of our team – built using LEGO Education SPIKE™ Prime for FIRST LEGO League.',
      robotBuilt: 'Our robot is built on the SPIKE Prime platform, featuring:',
      hub: 'A programmable intelligent hub with built-in color, force, and gyro sensors',
      motors: 'Medium and large motors for precise motion and attachments',
      modular: 'Modular design allowing quick attachment swaps between missions',
      customCode: 'Custom code written in code blocks for autonomous performance',
      duringCompetitions: 'During competitions, this robot autonomously completes missions on the mat, executing strategies developed by the team.',
      customAttachments: '🔧 Custom Attachments',
      artifactGripper: 'Artifact gripper – soft clamp for delicate pieces',
      drillModule: 'Drill module – spins to clear debris from target zones',
      extendedArm: 'Extended arm – reaches across wider field areas without repositioning',
      flexibilityEdge: 'These self‑made attachments give our robot flexibility and a competitive edge.',
      // project hints
      lidarHint: '✨ Move your mouse to simulate robot rotation ✨',
      navHint: '✨ Watch the robot navigate around obstacles ✨',
      missionHint: '✨ Watch the robot complete the challenge autonomously ✨',
      // Team page
      meetWizards: '✨ Meet the Wizards ✨',
      meetMore: 'Click on any team member to learn more about their magical powers!',
      // Contact page
      contactTitle: '🔮 Contact the Techno Wizards 🤖',
      contactSubtitle: 'Reach out to collaborate, ask questions, or learn more about our magical robotics journey!',
      email: 'Email',
      emailBestFor: '💬 Best for:',
      emailUse1: 'Partnership inquiries',
      emailUse2: 'Detailed questions about our projects',
      emailUse3: 'Media and interview requests',
      emailUse4: 'Collaboration opportunities',
      responseTime: '⏱️ Response time: 24-48 hours',
      socialMedia: 'Social Media',
      socialBestFor: '💬 Best for:',
      socialUse1: 'Following our competition updates',
      socialUse2: 'Behind-the-scenes content',
      socialUse3: 'Quick updates and announcements',
      socialUse4: 'Community engagement',
      dailyUpdates: '⏱️ Daily updates and stories',
      github: 'GitHub',
      githubBestFor: '💬 Best for:',
      githubUse1: 'Viewing our robot code',
      githubUse2: 'Technical collaboration',
      githubUse3: 'Code reviews and suggestions',
      githubUse4: 'Open source contributions',
      codeUpdated: '⏱️ Code updated after each competition',
      school: 'School',
      schoolBestFor: '💬 Best for:',
      schoolUse1: 'Visiting our team',
      schoolUse2: 'Watching practice sessions',
      schoolUse3: 'Educational partnerships',
      schoolUse4: 'School-related inquiries',
      teamMeets: '⏱️ Team meets: Wednesdays & Fridays, 3-6 PM',
      youtube: 'YouTube',
      youtubeBestFor: '💬 Best for:',
      youtubeUse1: 'Robot design walkthroughs',
      youtubeUse2: 'Competition highlights',
      youtubeUse3: 'Tutorial videos',
      youtubeUse4: 'Team vlogs and updates',
      newVideos: '⏱️ New videos monthly',
      discord: 'Discord',
      discordBestFor: '💬 Best for:',
      discordUse1: 'Real-time chat',
      discordUse2: 'FLL team networking',
      discordUse3: 'Quick technical questions',
      discordUse4: 'Community discussions',
      activeHours: '⏱️ Active during practice hours',
      joinCommunity: 'Join our Community',
      workflow: '🚀 How Our Communication Works',
      reachOut: 'Reach Out',
      reachOutDesc: 'Choose your preferred contact method above based on your needs',
      weReview: 'We Review',
      weReviewDesc: 'Our team reviews all messages during practice sessions',
      response: 'Response',
      responseDesc: 'We respond within 24-48 hours with detailed information',
      connect: 'Connect',
      connectDesc: 'We collaborate, share knowledge, or arrange meetings as needed'
    },
    ro: {
      home: 'Acasă',
      about: 'Despre',
      team: 'Echipă',
      project: 'Proiect',
      contact: 'Contact',
      robot: 'Robot',
      // Home page
      technoWizards: 'TECHNO WIZARDS',
      whereMagic: '⚡ Unde Magia Întâlnește Robotica ⚡',
      exploreWorld: 'Explorează Lumea Noastră',
      innovationProj: 'Proiect de Inovație',
      // About page
      ourMission: '🧠 Missiunea Noastră',
      missionText: 'Suntem o echipă FIRST LEGO League cu 8 membri pasionați de curiozitate, muncă în echipă și excelență în inginerie. Misiunea noastră este să rezolvam probleme din lumea reală folosind robotică, creativitate și știință.',
      ourHistory: '📜 Istoria Noastră',
      historyText: 'Acesta este al doilea an în care participăm la FIRST LEGO League, și suntem încântați să anunțăm că am trecut de regionalele! Această etapă reflectă dedicația, munca grea și pasiunea echipei noastre pentru robotică și inovație.',
      fllTitle: '⚙ FIRST LEGO League',
      fllText: 'FIRST LEGO League combină robotică, cercetare și inovație pentru a ajuta studenții să dezvolte gândirea critică, colaborarea și abilitățile tehnice. Competim în provocări care testează abilitățile noastre de inginerie, programare și rezolvare a problemelor.',
      ourRobotAbout: '🤖 Robotul Nostru',
      robotAboutText: 'Construit pe platforma SPIKE Prime, acest robot conduce misiunile noastre în mod autonom în competițiile FLL.',
      ourApproach: '🔬 Abordarea Noastră',
      approachPreview: 'Dă click pentru a descoperi metodologia noastră...',
      researchInnovation: 'Cercetare și Inovație',
      researchText: 'Aprofundăm probleme din lumea reală, cercetând soluții istorice și moderne pentru a crea abordări inovatoare.',
      robotEngineering: 'Inginerie Robotică',
      engineeringText: 'Proiectăm, construim și programăm roboți autonomi folosind LEGO SPIKE Prime, combinând design mecanic cu codare avansată.',
      teamCollaboration: 'Colaborarea Echipei',
      collaborationText: 'Fiecare membru aduce abilități unice - de la codare și construire la strategie și prezentare - lucrând împreună ca o unitate coezivă.',
      competitionElements: '🏆 Elemente de Competiție',
      competitionPreview: 'Aflează cum competim...',
      robotGame: 'Jocul Robotului',
      robotGameText: 'Robot autonom care completează misiuni tematice pe o platformă de competiție.',
      innovationProject: 'Proiect de Inovație',
      innovationProjectText: 'Cercetează și rezolvă probleme reale cu soluții creative.',
      robotDesign: 'Design Robotic',
      robotDesignText: 'Explică alegerile noastre de inginerie și strategiile de programare.',
      coreValuesLabel: 'Valori Fundamentale',
      coreValuesText: 'Demonstrează muncă în echipă, respect și profesionalism gracios.',
      coreValues: '🌟 Valorile Noastre Fundamentale',
      coreValuesSubtitle: 'Dă click pe fiecare valoare pentru a afla mai mult despre echipa noastră!',
      teamworkLabel: 'Muncă în Echipă',
      teamworkBack: 'Împreună Realizăm Mai Mult',
      teamworkDesc: 'Echipa noastră se întrunește săptămânal, brainstorm-uri și se susține reciproc. Fiecare glas contează!',
      innovationLabel: 'Inovație',
      innovationBack: 'Rezolvare Creativă de Probleme',
      innovationDesc: 'Gândim în afara conceptelor convenționale, combinând magia și tehnologia pentru a crea soluții robotice unice.',
      learningLabel: 'Învățare',
      learningBack: 'Creștere Continuă',
      learningDesc: 'Fiecare provocare este o oportunitate de învățare. Cercetăm, experimentăm și îmbunătățim constant.',
      professionalismLabel: 'Profesionalism Gracios',
      professionalismBack: 'Respect și Integritate',
      professionalismDesc: 'Competim acerb, dar tratăm toate echipele cu amabilitate și respect, sărbătorind succesul fiecăruia.',
      impactLabel: 'Impact',
      impactBack: 'Făcând o Diferență',
      impactDesc: 'Proiectele noastre urmăresc să rezolve probleme reale și să aibă un impact pozitiv asupra comunității noastre și dincolo.',
      funLabel: 'Distracție',
      funBack: 'Bucuria Descoperirii',
      funDesc: 'Iubim ceea ce facem! Robotica este entuziasmantă și sărbătorim fiecare etapă cu entuziasm.',
      // Project page
      innovationRobot: '🔮 Magia Inovării și Roboților 🤖',
      ancientModern: 'Explorând intersecția dintre înțelepciunea antică și tehnologia modernă',
      robotDemonstrations: '🎯 Demonstrații Robotice',
      interactiveVis: 'Vizualizări interactive ale capacităților robotului nostru',
      lidarScanning: '📡 Scanarea cu LiDAR',
      lidarText: 'Robotul nostru folosește senzori LiDAR pentru a emite raze laser în mai multe direcții. Fiecare rază măsoară distanța până la obstacolele apropiate, permițând robotului să detecteze pereții chiar și în întuneric complet. Această tehnologie este inspirată de explorarea peșterilor arheologice, unde viza tradițională nu reușește. Prin maparea mediului prin măsurarea distanțelor, descoperim spații ascunse - exact ca și cum ar face arheologii.',
      autonomousNav: '🧭 Navigare Autonomă',
      navText: 'Pe baza datelor LiDAR, robotul nostru calculează căi optime prin medii complexe. Folosește algoritmi avansați pentru a detecta obstacole, identifica spații libere și lua decizii de navigare în timp real. Sistemul nostru de navigare combină datele senzorilor cu algoritmi de căutare a căilor, permițând robotului să exploreze teritorii necunoscute în mod autonom - similar cu modul în care arheologii explorează sistematic siturile de săpătură.',
      artifactChallenge: '🏺 Provocarea Colectării Artefactelor',
      artifactSubtitle: 'Urmărește cum robotul nostru colectează și transportă artefacte arheologice',
      missionSimulation: '⛏️ Simularea Misiunii',
      missionText: 'În provocarea UNEARTHED™, robotul nostru trebuie să colecteze cu atenție artefacte din diferite locații pe teren și să le transporte în zone desemnate. Aceasta necesită poziționare precisă, manipulare delicată și planificare strategică. Această animație demonstrează una dintre misiunile noastre cheie: colectarea artefactelor și livrarea lor în zona muzeu. Urmărește cum robotul navighează pe teren, culege artefacte și marchează puncte plasând-le în locul corect.',
      challenge: '🔬 Provocarea',
      challengeText: 'UNEARTHED™ este tema provocării FLL din 2025-26, unde explorăm cum instrumentele, inovațiile și lucrările de artă ne conectează cu oameni și idei din istorie. Inspirați de arheologie, investigăm probleme istorice și aplicăm soluții STEM moderne.',
      robotGameProject: '🤖 Jocul Robotului',
      robotGameProjectText: 'Robotul nostru LEGO autonom completează ~15 misiuni pe un teren tematic, fiecare legată de sarcini arheologice. Proiectez, construim și programez folosind SPIKE™ Prime pentru a marca puncte maxime prin inginerie strategică și codare precisă.',
      innovationProjectSection: '💡 Proiect de Inovație',
      innovationProjectText: 'Cercetăm probleme reale legate de arheologie și descoperire istorică, dezvoltând soluții care fac o diferență tangibilă.',
      // Robot page
      ourRobot: '🤖 Robotul Nostru FLL SPIKE™ Prime',
      robotDescription: 'Inima echipei noastre – construit cu ajutorul LEGO Education SPIKE™ Prime pentru FIRST LEGO League.',
      robotBuilt: 'Robotul nostru este construit pe platforma SPIKE Prime, cu următoarele caracteristici:',
      hub: 'Un hub inteligent programabil cu senzori de culoare, forță și giroscop încorporați',
      motors: 'Motoare medii și mari pentru mișcare precisă și atașamente',
      modular: 'Design modular care permite schimbul rapid al atașamentelor între misiuni',
      customCode: 'Cod personalizat scris în code blocks pentru performanță autonomă',
      duringCompetitions: 'În competiții, acest robot completează în mod autonom misiuni pe scena, executând strategii dezvoltate de echipă.',
      customAttachments: '🔧 Atașamente Personalizate',
      artifactGripper: 'Dispozitiv de prindere a artefactelor – clemă moale pentru piese delicate',
      extendedArm: 'Brațul extins – ajunge pe zone de teren mai largi fără repoziționare',
      flexibilityEdge: 'Aceste atașamente fabricate singuri oferă robotului nostru flexibilitate și un avantaj competitiv.',
      // project hints
      lidarHint: '✨ Mutați mouse-ul pentru a simula rotația robotului ✨',
      navHint: '✨ Urmărește robotul navigând în jurul obstacolelor ✨',
      missionHint: '✨ Urmărește robotul completând provocarea autonom ✨',
      // Team page
      meetWizards: '✨ Întâlnește Vrăjitorii ✨',
      meetMore: 'Dă click pe orice membru al echipei pentru a afla mai mult despre puterile magice ale acestora!',
      // Contact page
      contactTitle: '🔮 Contactează Vrăjitorii Tehno 🤖',
      contactSubtitle: 'Ia legătura cu noi pentru a colabora, a pune întrebări, sau pentru a afla mai multe despre călătoria noastră magică în robotică!',
      email: 'Email',
      emailBestFor: '💬 Ideal pentru:',
      emailUse1: 'Cereri de parteneriat',
      emailUse2: 'Întrebări detaliate despre proiectele noastre',
      emailUse3: 'Cereri de interviu și media',
      emailUse4: 'Oportunități de colaborare',
      responseTime: '⏱️ Timp de răspuns: 24-48 ore',
      socialMedia: 'Rețele Sociale',
      socialBestFor: '💬 Ideal pentru:',
      socialUse1: 'Urmărirea actualizărilor competiției',
      socialUse2: 'Conținut din culisele echipei',
      socialUse3: 'Actualizări și anunțuri rapide',
      socialUse4: 'Implicare în comunitate',
      dailyUpdates: '⏱️ Actualizări și povești zilnice',
      github: 'GitHub',
      githubBestFor: '💬 Ideal pentru:',
      githubUse1: 'Vizualizarea codului robotului nostru',
      githubUse2: 'Colaborare tehnică',
      githubUse3: 'Recenzii de cod și sugestii',
      githubUse4: 'Contribuții open source',
      codeUpdated: '⏱️ Cod actualizat după fiecare competiție',
      school: 'Școală',
      schoolBestFor: '💬 Ideal pentru:',
      schoolUse1: 'Vizitarea echipei noastre',
      schoolUse2: 'Urmărirea sesiunilor de antrenament',
      schoolUse3: 'Parteneriate educaționale',
      schoolUse4: 'Întrebări legate de școală',
      teamMeets: '⏱️ Echipa se întâlnește: Miercuri și Vineri, 3-6 PM',
      youtube: 'YouTube',
      youtubeBestFor: '💬 Ideal pentru:',
      youtubeUse1: 'Prezentări de design ai robotului',
      youtubeUse2: 'Aspecte din competiție',
      youtubeUse3: 'Video-uri tutoriale',
      youtubeUse4: 'Vloguri și actualizări ale echipei',
      newVideos: '⏱️ Videouri noi lunar',
      discord: 'Discord',
      discordBestFor: '💬 Ideal pentru:',
      discordUse1: 'Chat în timp real',
      discordUse2: 'Rețea de echipe FLL',
      discordUse3: 'Întrebări tehnice rapide',
      discordUse4: 'Discuții în comunitate',
      activeHours: '⏱️ Activ în orele de antrenament',
      joinCommunity: 'Alătură-te Comunității Noastre',
      workflow: '🚀 Cum Funcționează Comunicarea Noastră',
      reachOut: 'Ia Legătura',
      reachOutDesc: 'Alege metoda de contact preferată mai sus bazată pe nevoile tale',
      weReview: 'Analizez',
      weReviewDesc: 'Echipa noastră revizuiește toate mesajele în sesiunile de antrenament',
      response: 'Răspuns',
      responseDesc: 'Răspundem în 24-48 de ore cu informații detaliate',
      connect: 'Conectare',
      connectDesc: 'Colaborăm, împărtășim cunoștințe și aranjam întâlniri după caz'
    }
  },

  init() {
    console.log('LanguageSwitcher init called');
    this.setLanguage(this.currentLanguage);
    this.createLanguageSwitcher();
    console.log('LanguageSwitcher initialized complete');
  },

  createLanguageSwitcher() {
    console.log('Creating language switcher...');
    // Check if switcher already exists
    if (document.getElementById('language-switcher')) {
      console.log('Language switcher already exists, skipping');
      return;
    }

    console.log('Building switcher HTML...');
    const switcher = document.createElement('div');
    switcher.id = 'language-switcher';
    switcher.className = 'language-switcher';
    switcher.innerHTML = `
      <button class="lang-btn lang-btn-en ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
        EN
      </button>
      <button class="lang-btn lang-btn-ro ${this.currentLanguage === 'ro' ? 'active' : ''}" data-lang="ro">
        🇷🇴 RO
      </button>
    `;

    console.log('Inserting switcher into DOM...');
    // place as first element so it stays on top of content
    document.body.insertBefore(switcher, document.body.firstChild);
    console.log('Switcher inserted');

    // if something later removes the switcher (e.g. dynamic page scripts), watch and re-add
    const observer = new MutationObserver((mutations) => {
      if (!document.getElementById('language-switcher')) {
        console.warn('Language switcher removed, re-inserting');
        document.body.insertBefore(switcher, document.body.firstChild);
      }
    });
    observer.observe(document.body, { childList: true });

    // Add event listeners
    const buttons = document.querySelectorAll('.lang-btn');
    console.log('Found', buttons.length, 'language buttons');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        console.log('Language button clicked:', lang);
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
      '[href="robot.html"]': this.translations[this.currentLanguage].robot,
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

// Initialize when DOM is ready or immediately if already loaded
if (document.readyState === 'loading') {
  console.log('DOM still loading, waiting for DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired, initializing LanguageSwitcher');
    LanguageSwitcher.init();
  });
} else {
  // DOM is already loaded
  console.log('DOM already loaded, initializing LanguageSwitcher immediately');
  LanguageSwitcher.init();
}
