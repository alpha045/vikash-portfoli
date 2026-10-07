# Vikash Kumar — Portfolio

Personal portfolio website built with React, Vite, and Tailwind CSS v4.

## Tech Stack
- React 18
- Vite 6
- Tailwind CSS v4
- React Icons v5

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Customize Your Data

All your personal info is in one file:

```
src/data/defaultData.js
```

Update your name, bio, skills, projects, experience, education, and social links there.

## Project Structure

```
vikash-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Achievements.jsx
│   │   ├── Education.jsx
│   │   ├── Research.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── defaultData.js
│   ├── hooks/
│   │   └── usePortfolioData.js
│   ├── utils/
│   │   └── storage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

Please analyze my existing portfolio and create comprehensive technical documentation for it. Based on this analysis, design a backend architecture using Node.js and Express.js that incorporates an email API to handle and receive incoming form data or inquiries. The documentation should include a project overview, a detailed breakdown of the current portfolio structure, a proposed backend schema, and implementation steps for the email integration.
