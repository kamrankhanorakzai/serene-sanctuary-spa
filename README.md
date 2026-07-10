<div align="center">

# 🏨 Aurora Grand Hotel

### Luxury Hotel Website with a Live **AI Voice Receptionist** 🎙️

*A premium five‑star hotel showcase site featuring a real‑time, spoken AI concierge powered by [ElevenLabs Conversational AI](https://elevenlabs.io/docs/agents-platform/overview).*

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TanStack Start](https://img.shields.io/badge/TanStack_Start-v1-FF4154?logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)
![ElevenLabs](https://img.shields.io/badge/ElevenLabs-Conversational_AI-000000?logo=elevenlabs&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)

</div>

---

## ⭐ The Star Feature — AI Voice Receptionist

> **Click the green phone button in the bottom‑right of the site and start talking.**
> A live, low‑latency voice conversation opens with an AI concierge that can greet guests, describe suites, answer questions about dining & the spa, and hand off gracefully when needed.

### 🔊 How the Voice Agent Works

```
 ┌─────────────┐    WebRTC (audio in/out)    ┌────────────────────────┐
 │   Browser   │ ──────────────────────────► │  ElevenLabs Agent      │
 │  (mic btn)  │ ◄────────────────────────── │  "John Smith" concierge│
 └─────────────┘      streamed speech        └────────────────────────┘
```

| Piece | Detail |
|---|---|
| **SDK** | [`@elevenlabs/react`](https://www.npmjs.com/package/@elevenlabs/react) — `useConversation` + `ConversationProvider` |
| **Transport** | **WebRTC** (`connectionType: "webrtc"`) — lowest latency, HD audio |
| **Mic access** | `navigator.mediaDevices.getUserMedia({ audio: true })` |
| **Agent ID** | `agent_3801kwpdkv40ftwt86kkfzs5w5xj` (public agent — no API key required) |
| **Live UI states** | *Connecting → Listening → Speaking* with animated pulse ring |
| **UX** | Floating WhatsApp‑style green call button, red end‑call state, mic‑denial handling |

### 🧩 The Integration (excerpt)

`src/components/site/VoiceAgent.tsx`

```tsx
import { ConversationProvider, useConversation } from "@elevenlabs/react";

const AGENT_ID = "agent_3801kwpdkv40ftwt86kkfzs5w5xj";

const conversation = useConversation({
  onError: (e) => console.error(e),
});

await navigator.mediaDevices.getUserMedia({ audio: true });
await conversation.startSession({
  agentId: AGENT_ID,
  connectionType: "webrtc",
});
```

That's it — the prompt, voice, tools, and first message are all configured
in the [ElevenLabs dashboard](https://elevenlabs.io/app/conversational-ai),
so the frontend stays clean and no backend/API key is required.

### 🔁 Swap in Your Own Agent

Edit one constant in `src/components/site/VoiceAgent.tsx`:

```ts
const AGENT_ID = "your_elevenlabs_agent_id";
```

---

## ✨ Other Highlights

- 🏨 Full luxury landing page — hero, suites, dining, spa, gallery, contact
- 💛 Custom **gold + deep‑navy** design system (Cormorant Garamond + Inter)
- 🌀 Framer Motion animations, glassmorphism, animated mic rings
- 📱 Fully responsive, mobile‑first
- 🔍 SEO‑ready — `sitemap.xml`, `robots.txt`, OpenGraph & Twitter meta
- ⚡ SSR‑ready via TanStack Start + Vite 7

---

## 🧱 Tech Stack

| Layer | Tech |
|---|---|
| Framework | [TanStack Start v1](https://tanstack.com/start) (React 19, SSR) |
| Bundler | [Vite 7](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (`@theme` tokens in `src/styles.css`) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [lucide‑react](https://lucide.dev/) |
| **Voice AI** | **[`@elevenlabs/react`](https://elevenlabs.io/docs/agents-platform/libraries/react)** (WebRTC) |
| Package manager | [Bun](https://bun.sh/) |

---

## 🚀 Getting Started

```bash
# 1. Clone
git clone https://github.com/<your-username>/aurora-grand-hotel.git
cd aurora-grand-hotel

# 2. Install
bun install

# 3. Run dev server
bun run dev
# → http://localhost:8080
```

Open the site → click the **green phone button** in the bottom‑right → allow
microphone access → start talking to the AI receptionist.

### Build for production

```bash
bun run build
bun run start
```

---

## 📁 Project Structure

```
src/
├─ routes/
│  ├─ __root.tsx           # App shell, head/meta, favicon, providers
│  ├─ index.tsx            # Home page (hero, suites, dining, spa…)
│  └─ sitemap[.]xml.ts     # SEO sitemap
├─ components/site/
│  ├─ Navbar.tsx           # Luxury glass navbar
│  ├─ VoiceMic.tsx         # Decorative animated mic (hero)
│  └─ VoiceAgent.tsx       # 🎙️  Live ElevenLabs voice agent
├─ assets/                 # Hero, rooms, gallery imagery
└─ styles.css              # Design tokens + custom utilities
public/
└─ favicon.png             # Gold hotel crest
```

---

## 🎨 Design System

Semantic tokens defined in `src/styles.css`:

- `--navy` / `--navy-deep` — brand base
- `--gold` / `--gold-soft` — accent + gradients
- `--ivory` — soft neutral surface
- Utilities: `text-gradient-gold`, `glass-panel`, `hairline-gold`
- Animations: `animate-mic-glow`, `animate-ring-pulse`, `animate-wave`, `animate-float-slow`

---

## 🖼️ Screenshots

> Add screenshots or a short demo GIF here — e.g. the hero, the voice button
> connected state, and the suites section.

```
docs/
├─ hero.png
├─ voice-agent.png
└─ suites.png
```

---

## 🤝 Contributing

Pull requests welcome! For major changes, open an issue first to discuss
what you'd like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

[MIT](./LICENSE) — for demo and showcase purposes.
Hotel branding, naming, and imagery are fictional.

---

<div align="center">

**Built with 💛 using [Lovable](https://lovable.dev) · Voice by [ElevenLabs](https://elevenlabs.io)**

</div>
