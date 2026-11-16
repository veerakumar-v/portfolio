/**
 * ===================================================================
 * 🎮 VEERAKUMAR V - RETRO VIDEO GAME PORTFOLIO CONFIGURATION
 * ===================================================================
 * 
 * Welcome to your portfolio configuration file!
 * You can easily customize ANY text, project, skill, or link here.
 * Simply edit the values below and refresh your browser.
 * No coding or rebuild steps required!
 * 
 * ===================================================================
 */

const PORTFOLIO_DATA = {
  // -----------------------------------------------------------------
  // 🕹️ PLAYER 1 PROFILE (HEADER & ABOUT ME)
  // -----------------------------------------------------------------
  player: {
    name: "Veerakumar V",
    alias: "PLAYER_01",
    role: "Full Stack Software Engineer",
    level: 99,
    classTitle: "Code Alchemist / System Architect",
    location: "Earth (Remote / On-Site)",
    availability: "READY FOR NEW QUESTS (Available for Hire)",
    
    // Short punchy retro tagline for the hero title screen
    tagline: "Building high-performance web applications, scalable architectures, and interactive digital experiences.",

    // About Me story / bio
    bio: [
      "Greetings, traveler! I am Veerakumar V, a passionate software engineer on an epic quest to craft fast, accessible, and delightful software.",
      "With years of experience across the modern web stack, I turn complex problems into clean, maintainable, and elegant solutions. When I'm not slaying bugs or optimizing database queries, you'll find me exploring emerging tech, open-source projects, and classic gaming history."
    ],

    // Photo settings:
    // Put your photo in the assets folder as 'photo.jpg' or provide an external image URL.
    // If photoUrl is set to "", it will use the stylish retro pixel avatar!
    photoUrl: "assets/photo.jpg", 
    avatarFallback: "assets/avatar.svg",

    // Character RPG Stats (0 to 100)
    stats: [
      { name: "Frontend Mastery", level: 95, icon: "🖥️" },
      { name: "Backend & Systems", level: 92, icon: "⚙️" },
      { name: "Database & Cloud", level: 88, icon: "☁️" },
      { name: "UI/UX & Accessibility", level: 90, icon: "🎨" },
      { name: "Problem Solving", level: 98, icon: "🧠" },
      { name: "Coffee Capacity", level: 99, icon: "☕" }
    ],

    // Quick Player Attributes
    attributes: {
      hp: "100 / 100",
      mp: "999 / 999",
      alignment: "Chaotic Clean Code",
      mainWeapon: "VS Code & TypeScript",
      specialAbility: "Refactoring Chaos into Harmony"
    }
  },

  // -----------------------------------------------------------------
  // 🍄 SKILLS AS POWER-UPS
  // -----------------------------------------------------------------
  // Each category represents an item box in your retro inventory.
  // Clicking any power-up in the game plays an 8-bit sound and awards points!
  powerUps: [
    {
      id: "power-frontend",
      categoryName: "MUSHROOM_UP // FRONTEND",
      categoryIcon: "🍄",
      badge: "+50 SPEED",
      description: "Supercharged user interfaces, responsive design, and blazing client performance.",
      skills: [
        { name: "JavaScript (ES6+)", icon: "⚡", level: "MAX" },
        { name: "TypeScript", icon: "🛡️", level: "MAX" },
        { name: "React / Next.js", icon: "⚛️", level: "MAX" },
        { name: "HTML5 & Semantic Web", icon: "🧱", level: "MAX" },
        { name: "CSS3 / Sass / Tailwind", icon: "🎨", level: "MAX" },
        { name: "State Management (Redux/Zustand)", icon: "🔄", level: "LVL 90" },
        { name: "Web Performance & Core Web Vitals", icon: "🚀", level: "LVL 95" }
      ]
    },
    {
      id: "power-backend",
      categoryName: "FIRE_FLOWER // BACKEND & APIS",
      categoryIcon: "🔥",
      badge: "+100 POWER",
      description: "Robust servers, resilient microservices, and high-throughput REST & GraphQL APIs.",
      skills: [
        { name: "Node.js & Express", icon: "🟩", level: "MAX" },
        { name: "Python / FastAPI", icon: "🐍", level: "LVL 90" },
        { name: "RESTful API Design", icon: "🔌", level: "MAX" },
        { name: "GraphQL", icon: "🕸️", level: "LVL 85" },
        { name: "Authentication (OAuth/JWT)", icon: "🔑", level: "LVL 95" },
        { name: "System Architecture", icon: "🏛️", level: "LVL 92" }
      ]
    },
    {
      id: "power-database",
      categoryName: "SUPER_STAR // DATA & CLOUD",
      categoryIcon: "⭐",
      badge: "+INVINCIBILITY",
      description: "Unbreakable databases, cloud infrastructure, containerization, and data caching.",
      skills: [
        { name: "PostgreSQL & SQL", icon: "🐘", level: "MAX" },
        { name: "MongoDB & NoSQL", icon: "🍃", level: "LVL 90" },
        { name: "Redis Caching", icon: "⚡", level: "LVL 90" },
        { name: "Docker & Containers", icon: "🐳", level: "LVL 88" },
        { name: "AWS & Cloud Deployments", icon: "☁️", level: "LVL 85" },
        { name: "CI / CD Pipelines", icon: "🔁", level: "LVL 90" }
      ]
    },
    {
      id: "power-tools",
      categoryName: "THUNDER_BOLT // TOOLS & CRAFT",
      categoryIcon: "⚡",
      badge: "+DEFENSE CRIT",
      description: "Testing, version control, developer experience, and reliable delivery practices.",
      skills: [
        { name: "Git & GitHub Mastery", icon: "🐙", level: "MAX" },
        { name: "Testing (Jest / Playwright)", icon: "🧪", level: "LVL 90" },
        { name: "Linux & Bash Terminal", icon: "🐧", level: "LVL 92" },
        { name: "Agile / Scrum Teamwork", icon: "🤝", level: "MAX" },
        { name: "Security & OWASP Best Practices", icon: "🔒", level: "LVL 88" },
        { name: "Performance Profiling", icon: "📈", level: "LVL 90" }
      ]
    }
  ],

  // -----------------------------------------------------------------
  // 🏰 PROJECTS AS LEVELS
  // -----------------------------------------------------------------
  // Each project is a stage/level in the game.
  // Add as many levels as you like!
  projects: [
    {
      world: "WORLD 1-1",
      title: "OmniFlow Cloud Platform",
      genre: "Enterprise SaaS // Real-Time Dashboard",
      badge: "CLEARED ★★★★★",
      score: "99,900 PTS",
      summary: "A high-scale collaborative workflow management platform featuring real-time data synchronization, dynamic role-based access, and interactive analytics.",
      highlights: [
        "Architected microservices handling 50k+ daily transactions with sub-80ms API latency.",
        "Implemented real-time collaboration canvas using WebSockets and conflict-free data types.",
        "Engineered comprehensive test suite achieving 92% code coverage with automated CI/CD."
      ],
      techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
      demoUrl: "https://example.com/demo1",
      githubUrl: "https://github.com/veerakumarv/project-one",
      featured: true
    },
    {
      world: "WORLD 1-2",
      title: "HyperPixel Game Engine",
      genre: "WebGL // Canvas // Audio Engine",
      badge: "CLEARED ★★★★☆",
      score: "78,500 PTS",
      summary: "A lightweight, modular 2D retro web game engine equipped with custom physics, sprite sheet animator, tiled map parser, and Web Audio retro synthesizer.",
      highlights: [
        "Crafted custom 60 FPS physics solver with zero garbage collection overhead during game loop.",
        "Built procedural 8-bit sound generator leveraging the native Web Audio API.",
        "Designed accessible mobile touch d-pad controls with customizable on-screen layouts."
      ],
      techStack: ["TypeScript", "Canvas API", "Web Audio API", "Vite", "PWA"],
      demoUrl: "https://example.com/demo2",
      githubUrl: "https://github.com/veerakumarv/project-two",
      featured: false
    },
    {
      world: "WORLD 1-3",
      title: "NeuroDoc AI Document Analyzer",
      genre: "Full-Stack AI // NLP // Fast Search",
      badge: "CLEARED ★★★★★",
      score: "85,200 PTS",
      summary: "Intelligent document parsing and semantic search platform capable of indexing multi-gigabyte PDF archives and answering natural language queries.",
      highlights: [
        "Integrated vector database for sub-second semantic retrieval across 100k+ documents.",
        "Built streaming token responses with optimistic UI updates for instant reader feedback.",
        "Reduced cold-start compute costs by 45% through optimized serverless functions."
      ],
      techStack: ["Next.js", "Python", "FastAPI", "Vector DB", "TailwindCSS"],
      demoUrl: "https://example.com/demo3",
      githubUrl: "https://github.com/veerakumarv/project-three",
      featured: false
    },
    {
      world: "WORLD 1-4",
      title: "PulseGuard DevOps Sentinel",
      genre: "Monitoring // Observability // CLI",
      badge: "CLEARED ★★★★☆",
      score: "91,400 PTS",
      summary: "An automated uptime and server health monitor with terminal-first CLI, live webhook alerting, incident response timelines, and latency tracing.",
      highlights: [
        "Constructed concurrent distributed ping monitors executing asynchronous health probes.",
        "Automated Slack, Discord, and Telegram incident alert broadcasts within 2 seconds of failure.",
        "Designed responsive dark/light dashboard with zero third-party chart dependencies."
      ],
      techStack: ["Go / Node.js", "Prometheus", "Webhooks", "PostgreSQL", "Docker"],
      demoUrl: "https://example.com/demo4",
      githubUrl: "https://github.com/veerakumarv/project-four",
      featured: false
    },
    {
      world: "WORLD 2-1",
      title: "BOSS STAGE: Nexus E-Commerce Engine",
      genre: "High-Volume Commerce // Payment Hub",
      badge: "FINAL BOSS DEFEATED 🏆",
      score: "120,000 PTS",
      summary: "Ultra-fast headless commerce storefront with sub-second page loads, global edge caching, Stripe payment integration, and real-time inventory management.",
      highlights: [
        "Achieved perfect 100/100 Google Lighthouse Core Web Vitals across all product pages.",
        "Handled 400% traffic spikes during flash sales with zero downtime using edge workers.",
        "Seamlessly migrated 200,000 SKUs with zero data loss or customer cart disruption."
      ],
      techStack: ["Next.js", "Stripe API", "GraphQL", "Redis", "Cloudflare Workers"],
      demoUrl: "https://example.com/demo5",
      githubUrl: "https://github.com/veerakumarv/project-five",
      featured: true
    }
  ],

  // -----------------------------------------------------------------
  // 📜 QUEST LOG // EXPERIENCE & EDUCATION
  // -----------------------------------------------------------------
  quests: [
    {
      period: "2023 - PRESENT",
      title: "Senior Software Engineer",
      guild: "Tech Innovators Guild",
      location: "San Francisco, CA / Remote",
      badge: "ACTIVE QUEST",
      description: "Leading frontend and API architecture for enterprise customer platforms. Mentoring junior developers, leading sprint planning, and driving high-performance software standards."
    },
    {
      period: "2021 - 2023",
      title: "Full Stack Developer",
      guild: "Apex Digital Solutions",
      location: "Bengaluru, India / Hybrid",
      badge: "QUEST COMPLETE",
      description: "Developed core web features for client applications, streamlined REST services, integrated CI/CD automation pipelines, and improved test suite coverage."
    },
    {
      period: "2019 - 2021",
      title: "Software Engineer Apprentice",
      guild: "CyberCraft Interactive",
      location: "Bengaluru, India",
      badge: "QUEST COMPLETE",
      description: "Implemented pixel-perfect responsive web designs, fixed performance bottlenecks, and contributed to open-source developer tooling."
    },
    {
      period: "2015 - 2019",
      title: "B.E. in Computer Science & Engineering",
      guild: "University Institute of Technology",
      location: "Tamil Nadu, India",
      badge: "DEGREE UNLOCKED 🎓",
      description: "Mastered algorithms, data structures, computer networks, database systems, and object-oriented design."
    }
  ],

  // -----------------------------------------------------------------
  // 📬 FINAL STAGE // CONTACT & SOCIAL MEDIA
  // -----------------------------------------------------------------
  contact: {
    heading: "FINAL STAGE: CONTACT THE DEVELOPER",
    subheading: "Ready to team up for your next campaign? Send a transmission!",
    email: "veerakumar.v@example.com", // Replace with your actual email
    phone: "+91 98765 43210",          // Replace or leave blank
    location: "Bengaluru, India // Remote Worldwide",
    responseLatency: "< 24 HOURS",
    
    // Social Links (Leave url empty to hide)
    socials: [
      { name: "GITHUB", url: "https://github.com", icon: "🐙", handle: "@veerakumarv" },
      { name: "LINKEDIN", url: "https://linkedin.com", icon: "💼", handle: "in/veerakumarv" },
      { name: "TWITTER_X", url: "https://twitter.com", icon: "🐦", handle: "@veerakumar_v" },
      { name: "DISCORD", url: "https://discord.com", icon: "🎮", handle: "Veerakumar#0001" },
      { name: "RESUME_PDF", url: "assets/resume.pdf", icon: "📜", handle: "Download CV" }
    ]
  },

  // -----------------------------------------------------------------
  // ⚙️ RETRO SYSTEM SETTINGS
  // -----------------------------------------------------------------
  settings: {
    defaultTheme: "dark", // "dark" (Arcade 1-Bit) or "light" (Game Boy Pocket / Paper)
    soundEnabledDefault: false, // Default audio state (true or false). Users can toggle via HUD
    enableCrtFilterDefault: true, // Default CRT scanline effect
    easterEggCode: "30_LIVES_ACTIVATED",
    copyrightYear: 2026
  }
};

// Export for browser script or modular usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
