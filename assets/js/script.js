'use strict';

/* =====================================================
   Pragyan Shukla — Personal Site JS
   ===================================================== */

// ---- NAVBAR: scroll shadow + active link highlight ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveLink();
});

function highlightActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 80;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('nav-hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

// ---- TYPEWRITER EFFECT ----
const phrases = [
  'Software Developer',
  'ML Enthusiast',
  'Car Guy',
  'Systems Thinker',
  'Data Engineer',
];

const typewriterEl = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 80;
const deletingSpeed = 45;
const pauseAfterType = 1800;
const pauseAfterDelete = 400;

function type() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typewriterEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, pauseAfterType);
      return;
    }
  } else {
    typewriterEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, pauseAfterDelete);
      return;
    }
  }

  setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

type();

// ---- FADE-IN ON SCROLL (IntersectionObserver) ----
const fadeEls = document.querySelectorAll(
  '.section-header, .about-grid, .timeline-item, .project-card, .skills-group, .blog-card, .contact-wrap'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling cards slightly
        const delay = entry.target.classList.contains('timeline-item') ||
                      entry.target.classList.contains('project-card') ||
                      entry.target.classList.contains('skills-group') ||
                      entry.target.classList.contains('blog-card')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
          : 0;

        setTimeout(() => entry.target.classList.add('in-view'), delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

// ---- PROJECT FILTER ----
const filterPills = document.querySelectorAll('.filter-pill');
const projectCards = document.querySelectorAll('.project-card');

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    const filter = pill.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ---- INTERACTIVE TERMINAL ----
(function () {
  const termBody  = document.getElementById('terminal-body');
  const termInput = document.getElementById('terminal-input');
  if (!termBody || !termInput) return;

  const PROMPT_HTML = '<span class="t-line t-dim">pragyan@portfolio:~$</span> ';

  // Command history navigation
  const cmdHistory = [];
  let historyPos = -1;

  // ---- Command definitions ----
  const COMMANDS = {
    help() {
      return [
        { cls: 't-head', text: 'Available commands:' },
        { cls: '',        text: '' },
        { cls: 't-dim',   text: '  whoami          — who is Pragyan?' },
        { cls: 't-dim',   text: '  ls projects      — list all projects' },
        { cls: 't-dim',   text: '  cat skills.txt   — view skills by category' },
        { cls: 't-dim',   text: '  history           — career timeline' },
        { cls: 't-dim',   text: '  contact           — get in touch' },
        { cls: 't-dim',   text: '  neofetch          — system info card' },
        { cls: 't-dim',   text: '  cars              — 🚗 easter egg' },
        { cls: 't-dim',   text: '  clear             — clear terminal' },
      ];
    },

    whoami() {
      return [
        { cls: '',       text: 'CS grad from George Mason University (class of 2025).' },
        { cls: '',       text: 'I build things at the intersection of ML, data engineering,' },
        { cls: '',       text: 'and systems — agentic AI, data pipelines, automation tools.' },
        { cls: '',       text: '' },
        { cls: 't-dim',  text: 'When I\'m not coding: Cars & Coffee, specialty coffee, long runs.' },
        { cls: 't-accent',text: 'Tagline: "I build things that move — in code and on roads."' },
      ];
    },

    ls() {
      return COMMANDS['ls projects']();
    },

    'ls projects'() {
      return [
        { cls: 't-head', text: 'Projects:' },
        { cls: '',       text: '' },
        { cls: 't-accent',text: '  [Agents]  Signal-Scout     — intent signal extraction + AI outreach' },
        { cls: 't-accent',text: '  [Agents]  GyNuRo           — agentic teleconsultation app' },
        { cls: '',       text: '  [ML/AI]   AutoFind          — semantic car search engine (Cohere NLP)' },
        { cls: '',       text: '  [ML/AI]   PV Power Predict  — solar panel output with ML (RISE Symposium)' },
        { cls: '',       text: '  [Data]    SoundScape        — music metadata enrichment pipeline' },
        { cls: '',       text: '  [Data]    PaceIQ            — Strava + Notion running insights' },
        { cls: '',       text: '  [Data]    Observability FW  — T-SQL data-quality framework (Chartway CU)' },
        { cls: '',       text: '  [Systems] Excel Pipeline    — 8hrs → 5mins via AWS Lambda + Python' },
        { cls: '',       text: '  [Systems] preflight         — plugin dependency manager for Claude Code' },
      ];
    },

    'cat skills.txt'() {
      return [
        { cls: 't-head', text: 'Languages & Frameworks:' },
        { cls: 't-dim',  text: '  Python  TypeScript  Java  SQL  T-SQL  R  Shell/Bash  HTML  CSS  React' },
        { cls: '',       text: '' },
        { cls: 't-head', text: 'AI & Machine Learning:' },
        { cls: 't-dim',  text: '  TensorFlow  PyTorch  Scikit-learn  Pandas  NumPy  LLM Agents' },
        { cls: 't-dim',  text: '  OpenAI API  Claude API  Cohere API  NLP' },
        { cls: '',       text: '' },
        { cls: 't-head', text: 'Cloud & DevOps:' },
        { cls: 't-dim',  text: '  AWS (Lambda, S3, SES/SNS)  Docker  Azure DevOps  Azure Data Lake  Git' },
        { cls: '',       text: '' },
        { cls: 't-head', text: 'Databases & Tools:' },
        { cls: 't-dim',  text: '  MongoDB  SQL Server  ServiceNow  SSMS  Notion API  Strava API  Jira' },
      ];
    },

    history() {
      return [
        { cls: 't-head', text: 'Career Timeline:' },
        { cls: '',       text: '' },
        { cls: 't-dim',  text: '  Dec 2021  The Sparks Foundation    — Data Science Intern' },
        { cls: 't-dim',  text: '  May 2023  ByteRatio Inc.           — Jr. Software Developer Intern' },
        { cls: 't-dim',  text: '  Jan 2024  George Mason University  — Undergraduate Researcher (ML)' },
        { cls: 't-dim',  text: '  May 2025  Chartway Credit Union    — Data Engineering Intern' },
        { cls: 't-dim',  text: '  Aug 2025  Chartway Credit Union    — Jr. Systems Administrator' },
        { cls: '',       text: '' },
        { cls: 't-accent',text: '  🎓  GMU Computer Science — Class of 2025' },
      ];
    },

    contact() {
      return [
        { cls: 't-head', text: 'Get in touch:' },
        { cls: '',       text: '' },
        { cls: '',       text: '  ✉  prag.shank@gmail.com' },
        { cls: '',       text: '  🔗 linkedin.com/in/pragyan-shukla-14808a206' },
        { cls: '',       text: '  🐙 github.com/pragyan2002' },
        { cls: '',       text: '' },
        { cls: 't-dim',  text: '  Open to new opportunities, collabs, and good coffee.' },
      ];
    },

    './contact'() {
      return COMMANDS.contact();
    },

    neofetch() {
      const art = [
        '        ██████╗ ███████╗',
        '        ██╔══██╗██╔════╝',
        '        ██████╔╝███████╗',
        '        ██╔═══╝ ╚════██║',
        '        ██║     ███████║',
        '        ╚═╝     ╚══════╝',
      ];
      const info = [
        'pragyan@portfolio',
        '──────────────────',
        'OS:      Portfolio v2.0',
        'Host:    George Mason University',
        'Uptime:  4+ years of building',
        'Shell:   Python / TypeScript / SQL',
        'Skills:  ML · Data Eng · Systems · Agents',
        'Status:  Open to opportunities',
        '',
        '⬛🟥🟨🟩🟦🟪',
      ];
      const lines = [];
      const maxLen = Math.max(art.length, info.length);
      for (let i = 0; i < maxLen; i++) {
        const left  = (art[i]  || '                       ').padEnd(26);
        const right = info[i] || '';
        lines.push({ cls: 't-pre', text: left + '  ' + right });
      }
      return lines;
    },

    cars() {
      return [
        { cls: 't-head',  text: 'Top 5 (completely unbiased):' },
        { cls: '',        text: '' },
        { cls: '',        text: '  🏎  Ferrari F40          — raw, analog perfection' },
        { cls: '',        text: '  🚗  Porsche 911 GT3 RS   — engineered obsession' },
        { cls: '',        text: '  🔵  BMW E46 M3           — the last pure M car' },
        { cls: '',        text: '  🇯🇵  Honda NSX (NA1)       — Honda doing the impossible' },
        { cls: '',        text: '  ⚡  Rimac Nevera          — the future is already here' },
        { cls: '',        text: '' },
        { cls: 't-dim',   text: '  (yes, I have opinions. no, I won\'t apologize.)' },
      ];
    },

    clear() {
      termBody.innerHTML = '';
      return null; // signal: no lines to append
    },
  };

  // Known fun-wrong commands
  const EASTER_EGGS = {
    'sudo make me a sandwich':  [{ cls: 't-dim', text: 'Nice try. You are not in the sudoers file.' }],
    'rm -rf /':                 [{ cls: 't-err', text: 'Access denied. Nice try though.' }],
    'git blame':                [{ cls: 't-dim', text: 'Blame: Pragyan Shukla <prag.shank@gmail.com>' }],
    'vim':                      [{ cls: 't-dim', text: 'Entering vim… just kidding. There\'s no escape.' }],
    'exit':                     [{ cls: 't-dim', text: 'There is no escape from this portfolio.' }],
    'pwd':                      [{ cls: '',      text: '/home/pragyan/portfolio' }],
    'uname -a':                 [{ cls: 't-dim', text: 'Portfolio 2.0 x86_64 GNU/Caffeine' }],
  };

  // ---- Render helpers ----
  function appendLine(cls, text) {
    const el = document.createElement('span');
    el.className = 'line-wrap';
    el.innerHTML = `<span class="t-line ${cls}">${escapeHtml(text)}</span>\n`;
    termBody.appendChild(el);
  }

  function appendCommandEcho(cmd) {
    const row = document.createElement('div');
    row.innerHTML = PROMPT_HTML + `<span class="t-line t-cmd">${escapeHtml(cmd)}</span>`;
    termBody.appendChild(row);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function scrollBottom() {
    termBody.scrollTop = termBody.scrollHeight;
  }

  function runCommand(raw) {
    const cmd = raw.trim();
    if (!cmd) return;

    appendCommandEcho(cmd);

    const lower = cmd.toLowerCase();
    const handler = COMMANDS[lower] || COMMANDS[cmd];
    const egg     = EASTER_EGGS[lower] || EASTER_EGGS[cmd];

    let lines;
    if (handler) {
      lines = handler();
    } else if (egg) {
      lines = egg;
    } else {
      lines = [{ cls: 't-err', text: `command not found: ${cmd}  (try 'help')` }];
    }

    if (lines !== null && lines) {
      lines.forEach(l => appendLine(l.cls, l.text));
      appendLine('', '');
    }

    scrollBottom();
  }

  // ---- Input event ----
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = termInput.value;
      cmdHistory.unshift(cmd);
      historyPos = -1;
      termInput.value = '';
      runCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyPos < cmdHistory.length - 1) {
        historyPos++;
        termInput.value = cmdHistory[historyPos];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPos > 0) {
        historyPos--;
        termInput.value = cmdHistory[historyPos];
      } else {
        historyPos = -1;
        termInput.value = '';
      }
    }
  });

  // Click anywhere on terminal window to focus input
  document.querySelector('.terminal-window')?.addEventListener('click', () => termInput.focus());

  // ---- Auto-welcome on scroll into view ----
  const WELCOME_MSG = "Welcome to Pragyan's portfolio terminal. Type 'help' to see what's possible.";
  let welcomed = false;

  const termObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !welcomed) {
        welcomed = true;
        termObserver.disconnect();
        typeWelcome(WELCOME_MSG);
      }
    });
  }, { threshold: 0.3 });

  const termSection = document.getElementById('terminal');
  if (termSection) termObserver.observe(termSection);

  function typeWelcome(msg) {
    const el = document.createElement('span');
    el.className = 't-line t-dim';
    termBody.appendChild(el);
    termBody.appendChild(document.createTextNode('\n'));

    let i = 0;
    const interval = setInterval(() => {
      el.textContent += msg[i];
      i++;
      scrollBottom();
      if (i >= msg.length) {
        clearInterval(interval);
        // Add blank line + cursor blink hint after welcome
        appendLine('', '');
      }
    }, 22);
  }
})();
