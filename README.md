# 🎮 Veerakumar V - 8-Bit Retro Video Game Portfolio

An authentic 90s monochrome / 1-bit retro video game portfolio website. Features projects as playable stages, skills as collectible inventory power-ups, smooth animations as you scroll, a Light/Dark mode switcher, and procedural 8-bit sound effects.

---

## 🌟 Key Features

- **🕹️ 90s Retro Aesthetic**: Authentic 1-bit black & white / monochrome design with pixel-art borders, dither grids, and scanlines.
- **🏰 Projects as Levels**: Conquered stages (World 1-1 through World 2-1 Boss Stage) with mission briefings, objectives, and source code links.
- **🍄 Skills as Power-Ups**: Interactive inventory item boxes (Mushroom Up, Fire Flower, Super Star, Lightning Bolt) that award score and play sound effects when clicked.
- **🌓 Light / Dark Mode Switcher**:
  - **Dark Mode**: Classic 1-bit arcade CRT monitor with crisp white pixels on pitch-black background.
  - **Light Mode**: Retro Nintendo Game Boy Pocket / Apple Macintosh 1-bit paper aesthetic.
- **📺 CRT Scanline Filter**: One-click toggle for authentic retro arcade scanline and curvature effects.
- **🔊 Procedural 8-Bit Sound Engine**: Built with the native Web Audio API (zero external MP3 files). Plays coin chimes, jump sounds, and victory fanfares. Muted by default with an instant HUD toggle.
- **📱 100% Mobile-Friendly**: Fully responsive across mobile phones, tablets, and desktops. Includes an on-screen tactile virtual D-pad and arcade buttons (A & B).
- **👤 About Me & Photo Frame**: Styled as an RPG character profile with level, class attributes, bio, and animated character stat bars.
- **⚡ Super Easy to Edit**: All portfolio text, projects, skills, links, and stats are centralized in a single, clearly commented `data.js` file!

---

## 🚀 Quick Start (Running Locally)

You can run this project with zero dependencies:

### Option 1: Direct File Opening
Double-click `index.html` to open it in any web browser!

### Option 2: Local Node.js Server
```bash
node serve.js
```
Then visit: `http://127.0.0.1:3000`

---

## ✏️ How to Edit Your Content

All content is located in **`data.js`**. You do **not** need to touch HTML or CSS to change your content!

### 1. Update Your Name, Role & Bio
Open `data.js` and edit the `player` object:
```javascript
player: {
  name: "Veerakumar V",
  role: "Full Stack Software Engineer",
  level: 99,
  tagline: "Building high-performance web applications...",
  bio: [
    "Greetings, traveler! I am Veerakumar V...",
    "With years of experience across the modern web stack..."
  ],
  ...
}
```

### 2. Add Your Real Photo
1. Place your photo inside the `assets/` folder (e.g. `assets/photo.jpg`).
2. In `data.js`, ensure `photoUrl` points to your photo:
```javascript
photoUrl: "assets/photo.jpg",
```
If no photo is found, it will automatically fallback to the stylish 8-bit pixel avatar `assets/avatar.svg`!

### 3. Edit or Add Projects (Levels)
In `data.js`, update the `projects` array:
```javascript
projects: [
  {
    world: "WORLD 1-1",
    title: "Your Project Name",
    genre: "Web App // SaaS",
    summary: "A brief description of your project...",
    highlights: [
      "Key achievement or feature 1",
      "Key achievement or feature 2"
    ],
    techStack: ["React", "TypeScript", "Node.js"],
    demoUrl: "https://your-demo-url.com",
    githubUrl: "https://github.com/your-username/repo"
  },
  ...
]
```

### 4. Edit Skills (Power-Ups)
In `data.js`, customize the `powerUps` array. You can adjust skill names, icons, and levels.

### 5. Update Contact & Social Media Links
In `data.js`, customize the `contact` object:
```javascript
contact: {
  email: "veerakumar.v@example.com",
  location: "Bengaluru, India // Remote Worldwide",
  socials: [
    { name: "GITHUB", url: "https://github.com/veerakumarv", icon: "🐙", handle: "@veerakumarv" },
    { name: "LINKEDIN", url: "https://linkedin.com/in/veerakumarv", icon: "💼", handle: "in/veerakumarv" }
  ]
}
```

---

## 🕹️ Easter Egg: The Konami Code
Type the legendary Konami Code on your keyboard:
`↑ ↑ ↓ ↓ ← → ← → B A`
To unlock **30 LIVES** and max out your developer score!

---

## 🌐 Deploy to the Web (Free in 2 Minutes)

### GitHub Pages:
1. Push this folder to a GitHub repository.
2. In GitHub, go to **Settings > Pages**.
3. Under "Source", choose **Deploy from a branch** and select `main` / `root`.
4. Click **Save** — your retro portfolio is live!

### Vercel / Netlify:
- Simply drag and drop the folder into [Netlify Drop](https://app.netlify.com/drop) or import to [Vercel](https://vercel.com).
