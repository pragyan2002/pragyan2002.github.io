# pragyan2002.github.io

Personal portfolio site for **Pragyan Shukla** — CS grad (GMU '25), software developer, ML enthusiast, car guy.

Live at [pragyan2002.github.io](https://pragyan2002.github.io)

---

## Stack

Pure HTML / CSS / JavaScript — no frameworks, no build step.

| File | Purpose |
|---|---|
| `index.html` | Single-page structure (7 sections) |
| `assets/css/style.css` | All styles, custom properties, responsive breakpoints |
| `assets/js/script.js` | Terminal engine, animations, easter egg, carousel, dot nav |

---

## Features

### 🥚 Easter egg — terminal modal
Click the rotating typewriter text in the hero 7 times. Each click ramps up a red glow and a countdown badge; on the 7th the text bursts and a full-screen terminal modal opens, pre-loaded with `neofetch`.

### 💻 Interactive terminal
Available two ways:
- **Modal** (via easter egg) — opens over the current view
- **Inline** (§06 Terminal) — auto-runs `neofetch` on scroll-into-view

Both terminals share the same command engine. Supported commands:

```
help          list all commands
whoami        bio
ls projects   project list (newest first)
cat skills.txt  skills by category
history       career timeline
contact       contact details
neofetch      ascii system info card
cars          top 5 cars (no apologies)
clear         clear output
```

Hint chips below each terminal are clickable buttons that run the command directly.

### 🎠 Project carousel
9 cards in a horizontal scroll-snap carousel, ordered most-recent-first. Arrow buttons on desktop, swipe/drag on mobile. Filter pills (All / Agents / ML·AI / Data / Systems) still work — filtering snaps back to position 1.

### 🔵 Sticky dot nav
8 dots fixed to the right edge, one per section. Active dot turns red and scales up as you scroll. Hover shows a tooltip label. Hidden on mobile (≤768 px).

### ✨ Other details
- Scroll-triggered fade-in for every section
- Typewriter cycling through 5 roles
- Navbar active-link highlight on scroll
- Hamburger menu for mobile
- No em-dashes anywhere

---

## Running locally

No build step required — just open in a browser:

```bash
git clone https://github.com/pragyan2002/pragyan2002.github.io.git
cd pragyan2002.github.io
open index.html          # macOS
# or: python3 -m http.server 8080  (then visit localhost:8080)
```

---

## License

MIT
