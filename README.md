# 🔮 Jyotish Guru - Modern Astrology Web App

**Jyotish Guru** is a modern, AI-powered Indian astrology SaaS platform that blends ancient Vedic wisdom with cutting-edge technology. Built for spiritual seekers and modern users alike, it offers personalized astrological insights using OpenAI and interactive UI modules.

---

## 🌟 Overview

Jyotish Guru enables users to receive astrological guidance through various modules like **Kundli Maker**, **Career Guruji**, **Relationship Guruji**, and more. It features a space-inspired UI, secure user authentication, and tiered subscription models.

---

## ✨ Features

- **AI-Powered Readings:** Personalized insights using OpenAI GPT models.
- **Modular System:**
  - **Kundli Maker** – Generate Vedic birth charts.
  - **Relationship Guruji** – Analyze relationship compatibility.
  - **Career Guruji** – Explore astrology-based career guidance.
  - **Compatibility Guruji** – Deep compatibility analytics.
  - **Business Guruji** – Astrological business insights.
  - **Gemstone Guruji** – Gemstone recommendations based on charts.
- **User Auth:** Email + password with secure JWT.
- **Subscriptions:** Free, Premium, and Annual tiers.
- **Responsive Design:** Optimized for all devices.
- **Theming:** Light/Dark mode toggle.
- **UI/UX:** Cosmic-themed animations and interactivity.

---

## 🚀 Tech Stack

### Frontend

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom animations
- **UI:** `shadcn/ui`, Framer Motion, Lucide Icons
- **Fonts:** Google Fonts (Cinzel, Raleway)

### Backend

- **API:** Next.js API Routes
- **Database:** PostgreSQL (via Neon)
- **ORM:** Prisma
- **Cache:** Redis (Upstash)
- **Auth:** Custom JWT with Redis session storage
- **AI:** OpenAI API

### DevOps

- **Deployment:** Vercel
- **Env Management:** `.env.local`, Vercel Dashboard
- **Database Hosting:** Neon
- **Redis Hosting:** Upstash

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/jyotish-guru.git
cd jyotish-guru
npm install
```

### ➕ Set up Environment Variables

Create a `.env.local` file in the root directory:

```env
# PostgreSQL (Neon)
DATABASE_URL="postgres://user:password@hostname/database"
DIRECT_URL="postgres://user:password@hostname/database"

# Redis (Upstash)
UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Razorpay
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
```

### 🗃️ Set up Database

```bash
npx prisma db push
```

### 🚀 Run Dev Server

```bash
npm run dev
```

Visit `http://localhost:3000` to explore the app.

---

## 🏗️ Project Structure

```
jyotish-guru/
├── app/                  # App Router pages and API routes
│   ├── api/              # Backend APIs
│   ├── auth/             # Auth pages
│   ├── dashboard/        # Dashboard and modules
├── components/           # Reusable UI and module-specific components
│   ├── dashboard/
│   ├── landing/
│   ├── ui/
│   └── cosmic-elements.tsx
├── lib/                  # Utility and service logic
│   ├── ai.ts             # OpenAI logic
│   ├── auth.ts
│   ├── prisma.ts
│   ├── redis.ts
│   └── utils.ts
├── prisma/               # Schema and migrations
├── public/               # Static assets
├── middleware.ts         # Middleware (e.g., auth guards)
├── tailwind.config.ts    # Tailwind setup
└── next.config.mjs       # Next.js config
```

---

## 🔮 Core Modules

### 💫 Kundli Maker Guruji

Generates Vedic birth charts and personalized predictions.

### ❤️ Relationship Guruji

Interpersonal dynamics, compatibility, and love patterns.

### 👔 Career Guruji

Career aptitude and timing insights.

### 👫 Compatibility Guruji

In-depth analysis of relationship compatibility.

### 🏢 Business Guruji

Business guidance based on astrology.

### 💎 Gemstone Guruji

Suggests beneficial gemstones for energy alignment.

---

## 💻 Usage

1. **Landing Page:** Introduction and overview
2. **Signup/Login:** Secure registration and access
3. **Dashboard:** Access all astrology modules
4. **Input Details:** Submit birth info for reports
5. **Consultation:** Ask questions and receive AI responses
6. **Upgrade:** Unlock unlimited features via subscription

---

## 📡 API Endpoints

| Endpoint           | Purpose                           |
| ------------------ | --------------------------------- |
| `/api/auth/*`      | Authentication routes             |
| `/api/user/*`      | Profile management                |
| `/api/astrology/*` | Core astrological readings        |
| `/api/payment/*`   | Subscription & payment processing |

---

## 🚢 Deployment (Vercel)

1. Connect your GitHub repo to [Vercel](https://vercel.com/)
2. Add environment variables in project settings
3. Trigger build & deploy

---

## 🙌 Contributing

```bash
# Fork the repository
git checkout -b feature/your-feature-name
# Commit your changes
git commit -m "Add your feature"
# Push
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)
- [OpenAI](https://openai.com/)
- [Prisma](https://www.prisma.io/)
- [Upstash Redis](https://upstash.com/)
- [Neon PostgreSQL](https://neon.tech/)
- [Vercel](https://vercel.com)

---

## 🌌 Future Enhancements

- 📱 Mobile apps (iOS & Android)
- 📆 Calendar-based event notifications
- 🌍 Multi-language support
- 🧑‍🤝‍🧑 Community forums & user profiles
- 📹 Live consultations with astrologers
- 📄 Downloadable reports (PDF)
- ⌚ Integration with wearables for real-time astrology

---

> Built with ❤️ and cosmic energy by Harshal Sawatkar
