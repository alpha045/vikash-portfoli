export const defaultData = {
  personal: {
    name: 'Vikash Kumar',
    title: 'Full Stack MERN Developer',
    tagline: 'Building scalable web apps with React, Node.js & MongoDB',
    location: 'India',
    education: 'B.Tech in Computer Science',
    currentStatus: 'Open to Work',
    bio: 'Passionate Full Stack Developer with hands-on experience building complete MERN stack applications. Strong problem solver with a focus on clean code, performance, and user experience. Active in hackathons and open source.',
    resumeUrl: '/vikash_resume.pdf',
    phone: '+91-8102258914',
    email: 'vikashkumar161012@gmail.com',
    github: 'https://github.com/alpha045',
    linkedin: 'https://www.linkedin.com/in/vikash-kumar045/',
    stats: {
      projects: 12,
      technologies: 20,
      internships: 2,
      research: 1,
    },
  },

  skills: [
    { name: 'JavaScript',       level: 'Advanced',      category: 'Programming Languages', icon: 'SiJavascript' },
    { name: 'Python',           level: 'Intermediate',  category: 'Programming Languages', icon: 'SiPython' },
    { name: 'C++',              level: 'Intermediate',  category: 'Programming Languages', icon: 'SiCplusplus' },
    { name: 'SQL',              level: 'Intermediate',  category: 'Programming Languages', icon: 'SiMysql' },
    { name: 'Dart',             level: 'Intermediate',  category: 'Programming Languages', icon: 'SiDart' },
    { name: 'React',            level: 'Advanced',      category: 'Frontend',              icon: 'SiReact' },
    { name: 'Flutter',          level: 'Intermediate',  category: 'Frontend',              icon: 'SiFlutter' },
    { name: 'HTML',             level: 'Advanced',      category: 'Frontend',              icon: 'SiHtml5' },
    { name: 'CSS',              level: 'Advanced',      category: 'Frontend',              icon: 'SiCss' },
    { name: 'Tailwind CSS',     level: 'Advanced',      category: 'Frontend',              icon: 'SiTailwindcss' },
    { name: 'Responsive Design',level: 'Advanced',      category: 'Frontend',              icon: 'FaMobileAlt' },
    { name: 'Node.js',          level: 'Advanced',      category: 'Backend',               icon: 'SiNodedotjs' },
    { name: 'Express.js',       level: 'Advanced',      category: 'Backend',               icon: 'SiExpress' },
    { name: 'MongoDB',          level: 'Intermediate',  category: 'Backend',               icon: 'SiMongodb' },
    { name: 'Firebase',         level: 'Intermediate',  category: 'Backend',               icon: 'SiFirebase' },
    { name: 'REST API',         level: 'Advanced',      category: 'Backend',               icon: 'TbApi' },
    { name: 'Git',              level: 'Advanced',      category: 'Tools',                 icon: 'SiGit' },
    { name: 'GitHub',           level: 'Advanced',      category: 'Tools',                 icon: 'SiGithub' },
    { name: 'Linux',            level: 'Intermediate',  category: 'Tools',                 icon: 'SiLinux' },
    { name: 'Postman',          level: 'Advanced',      category: 'Tools',                 icon: 'SiPostman' },
    { name: 'JWT',              level: 'Intermediate',  category: 'Tools',                 icon: 'SiJsonwebtokens' },
    { name: 'CRUD',             level: 'Advanced',      category: 'Tools',                 icon: 'FaDatabase' },
    { name: 'Async/Await',      level: 'Advanced',      category: 'Tools',                 icon: 'SiJavascript' },
    { name: 'Playwright',       level: 'Intermediate',  category: 'Tools',                 icon: 'SiPlaywright' },
  ],

  experience: [
    {
      company: 'Apna Time Tech Solutions',
      role: 'Full Stack Developer Trainee',
      duration: 'Jan 2026 – Jun 2026',
      description:
        'Built and deployed RESTful APIs using Node.js and Express. Developed React frontend components integrated with MongoDB backend. Implemented JWT authentication and role-based access control.',
    },
    {
      company: 'Open Source Project',
      role: 'Frontend Developer',
      duration: 'Jan 2024 – May 2024',
      description:
        'Contributed to an open source MERN application. Implemented responsive UI using React and Tailwind CSS. Collaborated using Git and GitHub following Agile practices.',
    },
  ],

  projects: [
    {
      name: 'Smart Kirana Store',
      description:
        'Designed a commercial store ledger management tool featuring digital khata, inventory adjustments, instant billing calculators, and custom daily sales reporting analytics.',
      technologies: ['React', 'Tailwind CSS'],
      github: 'https://github.com/alpha045/vikashkiranastore',
      live: 'https://smartkiranastoreweb.netlify.app/',
      image: '/smart.png',
    },
    {
      name: 'Civic Eye',
      description:
        'Programmed a localized public utility tracking system allowing community mapping, secure complaints processing, and complaint statuses. Embedded JWT authentication pipelines and persistent complex data models allowing efficient operations handling.',
      technologies: ['React', 'Node.js', 'Socket.IO', 'MongoDB', 'JWT'],
      github: 'https://github.com/alpha045/civiceye',
      live: '#',
      image: '/civiceye.png',
    },
    {
      name: 'Todo-App',
      description:
        'Responsive task management application built using React, Tailwind CSS, and browser Local Storage. Features seamless task creation, editing, deletion, state persistence, and filtering.',
      technologies: ['React', 'Tailwind CSS'],
      github: 'https://github.com/alpha045/todo-react',
      live: 'https://tasktodo10.netlify.app/',
      image: '/todo.png',
    }
  ],

  achievements: [
    {
      title: 'Hackathon Runner-Up',
      category: 'Hackathon',
      description:
        '2nd place at college-level 24-hour hackathon — built a disaster management app in a team of 4.',
      year: '2024',
    },
    {
      title: 'HRGA AI Architecture',
      category: 'Research',
      description:
        'Co-authored research outlining a modular AI system engine designed to improve conceptual reasoning, runtime memory bounds, and swift user execution privacy protection.',
      year: '2025',
    },
    {
      title: 'Apna Time Tech Solutions MERN Stack',
      category: 'Certificates',
      description:
        'Presented on MERN stack development best practices at the departmental tech symposium.',
      year: '2026',
    },
    {
      title: 'Flutter App Development',
      category: 'Certificates',
      description:
        'Completed Flutter app development workshop covering UI design, state management, and deployment.',
      year: '2024',
    },
    {
      title: 'Full Stack Web Dev Certificate',
      category: 'Certificates',
      description: 'Completed Udemy Full Stack Web Development bootcamp (40+ hours).',
      year: '2023',
    },
  ],

  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      college: 'Malout Institute of Management and Information Technology',
      duration: '2022 – 2026',
      grade: '6.98 CGPA',
    },
    {
      degree: '12th Grade (PCM)',
      college: 'Golf Field Railway Colony Ucch Madhyamik Vidyalaya, Samastipur',
      duration: '2019 – 2021',
      grade: '62.2%',
    },
  ],

  research: [
    {
      title: 'HRGA AI Architecture',
      description:
        'Co-authored research outlining a modular AI system engine designed to improve conceptual reasoning, runtime memory bounds, and swift user execution privacy protection.',
      publication:
        'International Journal of Computer Science and Technology (IJCST), Vol. 12, 2025',
      link: 'https://www.researchgate.net/publication/398966075_HRGA_A_HYBRID_REASONING_AND_GENERATION_ARCHITECTURE_FOR_MODULAR_EXPLAINABLE_AND_EFFICIENT_LARGE_LANGUAGE_MODELS',
    },
  ],

  social: {
    github: 'https://github.com/alpha045',
    linkedin: 'https://www.linkedin.com/in/vikash-kumar045/',
    email: 'vikashkumar161012@gmail.com',
  },
}
