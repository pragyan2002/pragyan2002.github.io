# pragyan2002.github.io

Personal portfolio site for **Pragyan Shukla**: CS grad (GMU '25), software developer, ML enthusiast, car guy.

Live at [pragyan2002.github.io](https://pragyan2002.github.io)

---

## Stack

Pure HTML / CSS / JavaScript. No frameworks, no build step, all motor.

| File | Purpose |
|---|---|
| `index.html` | Single-page structure (7 sections) |
| `assets/css/style.css` | All styles, custom properties, responsive breakpoints |
| `assets/js/script.js` | Terminal engine, animations, easter egg, carousel, gear nav, tachometer |

---

## Design

Automotive engineering editorial: carbon black backgrounds, rosso corsa red, gauge amber, warm cream text, and Archivo Black display type. Details throughout borrow from the garage: a riveted chassis plaque in the hero, spec-plate project cards with carbon-weave thumbnails, odometer-style timeline dates, racing-stripe section dividers, a subtle film-grain overlay, and headlight-sweep hovers.

---

## Features

### 🏁 Scroll tachometer
A small SVG rev counter fixed to the bottom-left corner. The needle sweeps with scroll progress and hits the redline at the footer. Hidden on mobile.

### ⚙️ Gear nav
A gear ladder (N, 1 through 7) fixed to the right edge, one gear per section. The active section is the engaged gear, lit in amber. Hover shows a tooltip label. Hidden on mobile (≤768 px).

### 🥚 Easter egg: terminal modal
Click the rotating typewriter text in the hero 7 times. Each click ramps up a red glow and a countdown badge; on the 7th the text bursts and a full-screen terminal modal opens, pre-loaded with `neofetch`.

### 💻 Interactive terminal
Available two ways:
- **Modal** (via easter egg): opens over the current view
- **Inline** (§06 Terminal): auto-runs `neofetch` on scroll-into-view

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
dyno          strap the portfolio to a dyno
redline       check the rev range
clear         clear output
```

Hint chips below each terminal are clickable buttons that run the command directly.

### 📟 Telemetry cluster
Count-up stat readouts in the About section (workflow time cut, R2 gain, devices monitored, projects shipped). Values are real and animate once on scroll-into-view; with reduced motion or no JS they simply display.

### 🎠 Project carousel
9 cards in a horizontal scroll-snap carousel, ordered most-recent-first. Arrow buttons on desktop, swipe/drag on mobile. Filter pills (All / Agents / ML·AI / Data / Systems) still work; filtering snaps back to position 1.

### ✨ Other details
- Scroll-triggered fade-in for every section
- Typewriter cycling through 5 roles
- Navbar active-link highlight on scroll
- Hamburger menu for mobile
- `prefers-reduced-motion` respected across every animation
- No em-dashes anywhere

---

## Running locally

No build step required. Just open in a browser:

```bash
git clone https://github.com/pragyan2002/pragyan2002.github.io.git
cd pragyan2002.github.io
open index.html          # macOS
# or: python3 -m http.server 8080  (then visit localhost:8080)
```

---

## License

MIT
