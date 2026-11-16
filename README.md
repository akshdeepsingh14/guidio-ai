# 🚀 Guidio AI

<h3 align="center">Your Personal AI-Powered Career & Learning Companion</h3>

<p align="center">
  <strong>Learn Smarter. Build Skills. Practise Interviews. Shape Your Future.</strong>
</p>

<p align="center">
  An all-in-one AI-powered platform helping students discover their potential, identify skill gaps, prepare for interviews, and build a successful career.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AI-Powered-7C3AED?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Free%20to%20Use-16A34A?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-installation--setup">Installation</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## 🌟 About Guidio AI

**Guidio AI** is a free-to-use AI-powered career guidance and placement-preparation platform designed for college students, fresh graduates, and aspiring professionals.

Finding the right career direction, identifying missing skills, and preparing for interviews can be challenging. Students often have to switch between multiple platforms to accomplish these tasks.

Guidio AI brings these essential tools together in one intelligent workspace.

With personalized AI-powered assistance, students can understand their strengths, discover areas for improvement, explore career opportunities, practise interviews, and create structured learning roadmaps.

### 🎯 Our Mission

To make AI-powered education, career guidance, skill development, and interview preparation accessible to every student.

**One Platform. Multiple Possibilities. A Smarter Future.**

---

## ✨ Features

### 🤖 1. AI Student Assistant

Your personal AI-powered learning companion.

- Ask academic and technical questions.
- Get explanations across different educational fields.
- Receive programming and coding assistance.
- Understand complex concepts through AI-generated explanations.
- Stream AI responses in real time.
- Manage conversations and chat history.
- Markdown and code rendering with copy functionality.

### 🎤 2. AI Mock Interview

Prepare for real-world interviews with personalized AI-powered interview sessions.

- Technical interviews.
- HR interviews.
- Mixed interview sessions.
- Three difficulty levels.
- AI-generated interview questions.
- Per-answer evaluation and feedback.
- Performance scores.
- Detailed interview summaries.
- Interview history and progress review.

### 📊 3. AI Skill Gap Analysis

Understand the difference between your current skills and the skills required for your desired career.

- Analyze your existing skills.
- Identify missing skills.
- Discover strengths and improvement areas.
- View missing skills according to priority.
- Get personalized learning recommendations.
- Explore relevant project ideas.
- Generate structured learning roadmaps.
- Access previously generated reports.

### 🎯 4. AI Career Guidance

Make informed decisions about your professional future.

- Personalized career recommendations.
- Career readiness information.
- Recommended and alternative job roles.
- Skill development roadmaps.
- Project recommendations.
- Interview preparation topics.
- Career plan history.

### 📈 5. Student Dashboard

A centralized workspace for your learning and career preparation.

- Profile completion overview.
- Career readiness score.
- Skill match information.
- Interview activity and statistics.
- Recent activity.
- Recommended next steps.
- Real backend-generated dashboard information.
- Helpful empty states for new students.

### 👤 6. Student Profile & Onboarding

- Four-step student onboarding process.
- Education and college information.
- Degree and graduation details.
- Experience level.
- Programming skills and interests.
- Target career role.
- Profile editing.
- Unsaved-changes protection.

### 🔔 7. Notifications & Settings

- Weekly career-readiness reminders.
- Activity notifications.
- Account information through Clerk.
- Light theme.
- Dark theme.
- System appearance preference.
- Sign-in methods.
- Account settings and sign-out.
- AI usage information.

### 📱 8. Responsive Experience

- Mobile-friendly interface.
- Tablet optimization.
- Desktop layouts.
- Responsive design starting at 320px.
- Consistent light and dark themes.
- Lazy-loaded application pages.

---

## 🖥️ Platform Preview

<p align="center">
  <strong>Explore the Guidio AI Experience</strong>
</p>

<p align="center">
  <i>Replace these placeholders with screenshots from your actual application.</i>
</p>

<table>
  <tr>
    <td align="center"><strong>Landing Page</strong></td>
    <td align="center"><strong>Student Dashboard</strong></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/landing.png" alt="Guidio AI Landing Page" /></td>
    <td><img src="docs/screenshots/dashboard.png" alt="Guidio AI Dashboard" /></td>
  </tr>
  <tr>
    <td align="center"><strong>AI Mock Interview</strong></td>
    <td align="center"><strong>Skill Gap Analysis</strong></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/mock-interview.png" alt="AI Mock Interview" /></td>
    <td><img src="docs/screenshots/skill-gap.png" alt="AI Skill Gap Analysis" /></td>
  </tr>
</table>

---

## 🛠️ Technology Stack

Guidio AI is developed using modern web technologies.

| Category | Technology |
|---|---|
| Frontend | React 19, Vite 8, JavaScript JSX |
| Routing | React Router 8 |
| Styling | Tailwind CSS 4 |
| UI Components | Base UI, shadcn-style components |
| Icons | Lucide React |
| Authentication | Clerk |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas |
| ORM | Prisma ORM 6 |
| Primary AI | Google Gemini |
| Fallback AI | Groq |
| Optional Local AI | Ollama |
| Validation | Zod |
| Background Jobs | Inngest |
| Security | Helmet, CORS, express-rate-limit |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## 🏗️ Architecture

Guidio AI follows a separate frontend and backend architecture.

```text
                     STUDENT
                        |
                        v
                GUIDIO AI FRONTEND
                  React + Vite
                        |
                        v
                CLERK AUTHENTICATION
                        |
                        | HTTPS
                        v
                 EXPRESS BACKEND
                   Node.js + API
                        |
             +----------+----------+
             |          |          |
             v          v          v
          MONGODB    AI ENGINE   INNGEST
           ATLAS         |      BACKGROUND
                         |        JOBS
                   +-----+-----+
                   |     |     |
                   v     v     v
                GEMINI  GROQ  OLLAMA
                   |     |     |
                   +-----+-----+
                         |
                         v
                  AI GENERATED
                     RESULTS
                         |
                         v
                  STUDENT DASHBOARD
```

### Architecture Principles

- The browser never communicates directly with MongoDB or AI providers.
- All AI requests are handled through the authenticated Express API.
- Clerk verifies authenticated student requests.
- Secret API keys remain on the backend.
- The AI Assistant streams responses using Server-Sent Events.
- Prisma manages database access.
- Inngest handles configured background functions.

---

## 📁 Project Structure

```text
Guidio-Ai/
│
├── client/                         # React frontend
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── app/                    # Theme context and provider
│   │   │
│   │   ├── components/
│   │   │   ├── common/             # Shared components
│   │   │   └── ui/                 # UI components
│   │   │
│   │   ├── features/
│   │   │   ├── assistant/
│   │   │   ├── auth/
│   │   │   ├── career/
│   │   │   ├── dashboard/
│   │   │   ├── interview/
│   │   │   ├── landing/
│   │   │   ├── onboarding/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   └── skill-gap/
│   │   │
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   └── vercel.json
│
├── server/                          # Express backend
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── ai/                     # AI provider manager
│   │   ├── config/                 # Environment and database
│   │   ├── controllers/
│   │   ├── inngest/                # Background functions
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── tests/
│   └── .env.example
│
├── docs/
│   └── screenshots/
│
├── render.yaml
│
└── README.md
```

---

## ⚙️ Installation & Setup

Want to run Guidio AI on your local machine?

Follow the instructions below.

### 📋 Prerequisites

Install the following before getting started:

- Node.js **22.22 or newer**.
- npm.
- Git.
- VS Code (recommended).
- MongoDB Atlas account.
- Clerk account.
- Google AI Studio account for Gemini API access.
- Groq account for optional AI fallback.
- Vercel and Render accounts for deployment.
- Inngest account if using Inngest Cloud.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd Guidio-Ai
```

### 2. Windows 11 Setup

Open the project in VS Code.

Go to:

`Terminal → New Terminal → PowerShell`

Check your installed versions:

```powershell
node -v
npm -v
git --version
```

If PowerShell displays an error saying that `npm.ps1` cannot be loaded because script execution is disabled, run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Alternatively, use Command Prompt.

### 3. Frontend Installation

Open a terminal:

```powershell
cd client
npm install
```

Create the frontend environment file:

```powershell
Copy-Item .env.example .env.local
```

Configure your frontend environment variables in:

`client/.env.local`

### 4. Backend Installation

Open another terminal from the project root:

```powershell
cd server
npm install
```

Create the backend environment file:

```powershell
Copy-Item .env.example .env
```

Generate Prisma Client:

```bash
npx prisma generate
```

Configure the backend environment variables in:

`server/.env`

### 5. Database Setup

If your MongoDB Atlas database is brand new and empty, apply the Prisma schema:

```bash
npx prisma db push
```

**Important:** MongoDB does not use Prisma migrations in this setup. `db push` applies the schema directly. Always read Prisma's output before confirming schema changes.

---

## 🔑 Environment Variables

Guidio AI uses separate environment files for the frontend and backend.

| File | Purpose |
|---|---|
| `client/.env.local` | Frontend configuration |
| `server/.env` | Backend configuration |

Both real environment files should remain private and must not be committed to GitHub.

### Frontend Environment Variables

File: `client/.env.local`

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API address |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |

Example:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key
```

**Security:** Everything beginning with `VITE_` is exposed in the browser bundle. Never put private credentials in frontend environment variables.

### Backend Environment Variables

File: `server/.env`

| Variable | Required | Description |
|---|---|---|
| `PORT` | Yes | Backend server port; default 5000 |
| `NODE_ENV` | No | Development or production |
| `CORS_ORIGINS` | Production | Allowed frontend origins |
| `FRONTEND_LOCAL` | No | Additional local frontend origin |
| `FRONTEND_URL` | No | Additional frontend/LAN origin |
| `CLERK_SECRET_KEY` | Yes | Clerk server secret |
| `CLERK_PUBLISHABLE_KEY` | Yes | Matching Clerk publishable key |
| `DATABASE_URL` | Yes | MongoDB connection string |
| `GEMINI_API_KEY` | At least one AI key | Google Gemini API key |
| `GROQ_API_KEY` | Optional | Groq fallback API key |
| `INNGEST_DEV` | No | Local Inngest development mode |
| `INNGEST_EVENT_KEY` | Production | Inngest event key |
| `INNGEST_SIGNING_KEY` | Production | Inngest signing key |

The server requires its essential database, Clerk and AI configuration before startup. Production also requires valid CORS configuration.

For additional backend configuration details, see the server documentation if maintained in your repository.

---

## ▶️ Run Locally

Use two terminals.

### Terminal 1 — Backend

```bash
cd server
npm run dev
```

The backend should start on:

```text
http://localhost:5000
```

Test the health endpoint:

```text
http://localhost:5000/api/health
```

Expected result:

```json
{
  "status": "healthy"
}
```

### Terminal 2 — Frontend

```bash
cd client
npm run dev
```

Open your browser:

```text
http://localhost:5173
```

**Congratulations! Guidio AI is running locally.**

### Useful Frontend Commands

```bash
npm run lint
npm run build
npm run preview
```

Optional bundle analysis in PowerShell:

```powershell
$env:ANALYZE="true"
npm run build
```

---

## 📱 Run on Your Local Network (LAN)

You can access Guidio AI from your mobile phone or another laptop connected to the same Wi-Fi network.

### Step 1 — Find Your Laptop IP

Open PowerShell:

```powershell
ipconfig
```

Find the IPv4 address under your Wi-Fi adapter.

Example:

```text
192.168.1.25
```

### Step 2 — Configure Frontend

Edit `client/.env.local`:

```env
VITE_API_BASE_URL=http://192.168.1.25:5000
```

Restart the Vite development server after changing this value.

### Step 3 — Configure Backend CORS

Edit `server/.env`:

```env
FRONTEND_URL=http://192.168.1.25:5173
```

Restart the backend and confirm the frontend origin appears in the server logs.

### Step 4 — Configure Windows Firewall

Run PowerShell as Administrator:

```powershell
New-NetFirewallRule -DisplayName "Guidio AI Frontend 5173" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow -Profile Private
```

```powershell
New-NetFirewallRule -DisplayName "Guidio AI Backend 5000" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow -Profile Private
```

Make sure your Wi-Fi network is configured as a Private network.

### Step 5 — Open Guidio AI on Your Phone

Open:

```text
http://192.168.1.25:5173
```

Replace the example IP with your actual laptop IP.

**Note:** Your laptop and mobile device must be connected to the same Wi-Fi network. Clerk Development Mode is used for the current local setup.

---

## 🔌 API Overview

All API routes except the health endpoint require authentication.

Authorization header:

```http
Authorization: Bearer <Clerk session token>
```

Standard response structure:

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

### Main API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Backend health check |
| GET | `/api/users/me` | Current authenticated user |
| GET, PUT | `/api/profile` | Student profile |
| GET | `/api/dashboard` | Dashboard information |
| GET, POST | `/api/assistant/conversations` | List or create conversations |
| GET, DELETE | `/api/assistant/conversations/:id` | Read or delete conversations |
| POST | `/api/assistant/conversations/:id/messages` | Send streamed AI messages |
| GET, POST | `/api/career/plans` | Career guidance plans |
| GET | `/api/career/plans/:id` | Individual career plan |
| GET, POST | `/api/skill-gap/reports` | Skill gap reports |
| GET | `/api/skill-gap/reports/:id` | Individual skill gap report |
| GET, POST | `/api/interviews` | Mock interview sessions |
| GET | `/api/interviews/:id` | Individual interview |
| POST | `/api/interviews/:id/questions/:questionId/answer` | Submit interview answers |
| GET | `/api/reminders` | Notifications |
| PATCH | `/api/reminders/:id/read` | Mark notification as read |
| PATCH | `/api/reminders/read-all` | Mark all notifications as read |
| Various | `/api/inngest` | Background job endpoint |

### Profile Storage

The profile API stores:

- Education.
- College.
- Degree.
- Graduation year.
- Experience level.
- Target role.
- Skills.
- Interests.

The current frontend also collects a branch and programming languages. Until dedicated backend fields are available, the branch is saved within the degree field as `Degree | Branch`, and programming languages are saved inside skills.

The student's full name is saved to the Clerk account.

---

## 🔐 Clerk Authentication

Guidio AI currently uses a Clerk Development instance.

Development keys generally begin with:

- `pk_test_`
- `sk_test_`

### Configuration

1. Create an application in the Clerk dashboard.
2. Enable your preferred sign-in methods.
3. Copy the publishable key into the frontend.
4. Configure the same publishable key on the backend.
5. Add the secret key to the backend only.

Development instances support the current localhost, LAN and Vercel development setup.

**Important:** Clerk Development Mode is intended for development and testing. Before a public production launch, review Clerk's current production requirements, usage limits and security recommendations.

---

## 🧠 AI Providers & Automatic Failover

Guidio AI supports multiple AI providers.

| Provider | Role |
|---|---|
| Google Gemini | Primary AI provider |
| Groq | Fallback AI provider |
| Ollama | Optional local AI provider |

### How AI Failover Works

The backend attempts configured providers in order:

```text
        AI REQUEST
             |
             v
       GOOGLE GEMINI
             |
      +------+------+
      |             |
   SUCCESS        FAILURE
      |             |
      v             v
    RESULT         GROQ
                    |
              +-----+-----+
              |           |
           SUCCESS      FAILURE
              |           |
              v           v
            RESULT      OLLAMA
                          |
                    +-----+-----+
                    |           |
                 SUCCESS      FAILURE
                    |           |
                    v           v
                  RESULT    ERROR MESSAGE
```

### Rate Limit Handling

Guidio AI is designed to handle provider availability issues.

- Displays clear rate-limit messages.
- Provides wait-time information when available.
- Pauses requests during cooldown periods.
- Preserves the student's typed message.
- Avoids displaying invented AI usage statistics.
- Keeps provider API keys on the backend.

Model names are configurable through `GEMINI_MODEL` and `GROQ_MODEL`.

> **Free-tier notice:** Gemini and Groq may have request quotas, rate limits and model restrictions. Their free-tier policies can change. Guidio AI is free to use, but unlimited AI requests are not guaranteed.

---

## 🗄️ MongoDB Configuration

Guidio AI uses MongoDB Atlas with Prisma ORM.

### Setup

1. Create a MongoDB Atlas account.
2. Create a cluster.
3. Open Database Access.
4. Create a database user with a strong password.
5. Configure Network Access for your development IP.
6. Open Connect → Drivers.
7. Copy the MongoDB connection string.

Example:

```text
mongodb+srv://<user>:<password>@<cluster>.mongodb.net/guidio-ai?retryWrites=true&w=majority
```

Add your connection string to:

```env
DATABASE_URL=your_mongodb_connection_string
```

If your password contains special characters, URL-encode them.

For hosted deployments, configure Atlas Network Access carefully. If using a hosting provider without fixed outbound IP addresses, understand the security trade-offs before using broad IP allowlisting.

---

## 🌐 Deployment

Guidio AI uses a separate hosting setup for the frontend, backend and database.

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

### 1. Deploy Backend on Render

1. Open Render.
2. Select New → Web Service.
3. Connect your GitHub repository.
4. Configure:

| Setting | Value |
|---|---|
| Root Directory | `server` |
| Runtime | Node |
| Build Command | `npm ci && npx prisma generate` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |
| Instance Type | Free, if available |

Configure backend environment variables:

```text
NODE_ENV=production
CORS_ORIGINS=your_vercel_frontend_url
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
DATABASE_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

Add Inngest Cloud credentials if required.

Do not manually set `PORT` on Render unless your deployment configuration requires it. Render normally provides the port automatically.

Deploy and check:

```text
https://your-service.onrender.com/api/health
```

### 2. Deploy Frontend on Vercel

1. Open Vercel.
2. Select Add New → Project.
3. Import your GitHub repository.
4. Configure:

| Setting | Value |
|---|---|
| Root Directory | `client` |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js Version | 22.x |

Configure frontend environment variables:

```env
VITE_API_BASE_URL=https://your-backend.onrender.com
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Deploy your application.

The existing `client/vercel.json` handles SPA route rewrites so refreshing application routes works correctly.

### 3. Connect Frontend and Backend

After deployment:

1. Copy your deployed Vercel URL.
2. Add it to Render's `CORS_ORIGINS`.
3. Confirm your frontend and backend use matching Clerk keys.
4. Redeploy the backend.
5. Test authentication and API functionality.

Remember to redeploy Vercel after changing frontend environment variables.

---

## 🔄 GitHub Workflow

### First-Time Setup

Run these commands from the project root:

```bash
git init
git add .
git status
```

Check that no `.env`, `.env.local` or `node_modules` directories are included.

Then:

```bash
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

### Daily Development Workflow

Create a feature branch:

```bash
git checkout -b feature/short-name
```

After making changes, run:

```bash
npm run lint
npm run build
```

Then commit:

```bash
git add .
git commit -m "Describe the changes"
git push -u origin feature/short-name
```

Create a Pull Request on GitHub and merge it into `main` after review.

Vercel and Render can automatically redeploy from the configured branch when auto-deploy is enabled.

### Check for Tracked Environment Files

On Windows:

```powershell
git ls-files | findstr /i "\.env"
```

Only example environment files containing placeholders should be tracked.

---

## 🐛 Troubleshooting

| Problem | Possible Solution |
|---|---|
| Missing `VITE_API_BASE_URL` | Check `client/.env.local` and restart Vite. |
| Missing Clerk publishable key | Configure the frontend Clerk key. |
| Missing backend environment variable | Check `server/.env`. |
| PowerShell blocks npm | Update the execution policy or use Command Prompt. |
| Node version error | Install Node.js 22.22 or newer. |
| Cannot reach backend | Check the API URL and backend availability. |
| CORS error | Add the exact frontend origin to backend CORS configuration. |
| 401 Unauthorized | Verify that Clerk keys belong to the same application. |
| Works on laptop but not phone | Check LAN API URL, firewall and Wi-Fi network. |
| Prisma Client error | Run `npx prisma generate` inside `server`. |
| MongoDB connection error | Verify `DATABASE_URL` and Atlas Network Access. |
| AI rate limit 429 | Wait for provider cooldown or configured fallback availability. |
| AI service unavailable 503 | Check provider API keys and model configuration. |
| First request is slow | Render free services may need time to wake up. |
| Blank Vercel page | Check frontend environment variables and browser console. |
| Dashboard refresh returns 404 | Verify `client/vercel.json` SPA rewrite configuration. |
| Theme flashes during loading | Hard refresh using `Ctrl + Shift + R`. |

---

## 🔒 Security & Privacy

Security is an important part of Guidio AI.

- Keep `CLERK_SECRET_KEY` on the backend.
- Keep `GEMINI_API_KEY` and `GROQ_API_KEY` private.
- Never expose `DATABASE_URL`.
- Never commit `.env` or `.env.local`.
- Use `.env.example` files with placeholders.
- Authenticate protected API requests through Clerk.
- Validate incoming requests.
- Use rate limiting and security middleware.
- Keep database credentials strong.

### If an API Key Is Exposed

If a private key has been committed or shared:

1. Revoke or rotate the exposed Clerk secret key.
2. Revoke and replace exposed AI provider keys.
3. Change the MongoDB database user's password.
4. Update local environment files.
5. Update Render environment variables.
6. Redeploy the backend.

Removing a secret from Git does not remove it from Git history. Rotate exposed credentials immediately.

---

## 💡 Free Hosting & Usage Limitations

Guidio AI is designed to be free to use, with a deployment setup that can use free-tier services.

However, third-party services have their own limitations.

| Service | Potential Limitation |
|---|---|
| Render | Free services may sleep after inactivity and have slower cold starts. |
| Vercel | Free plan has deployment and usage limits. |
| MongoDB Atlas | Free clusters have storage and connection limits. |
| Google Gemini | Free-tier quotas and rate limits. |
| Groq | Free-tier usage restrictions. |
| Clerk | Development and production usage restrictions. |
| Inngest | Plan-specific event and execution limits. |

These policies can change. Check each provider's current documentation before deployment.

**Our goal is to keep Guidio AI accessible without requiring students to purchase a subscription to use the application.**

---

## 🚀 Future Vision

Guidio AI aims to make career preparation more accessible, organized and intelligent.

Our vision is to bring education assistance, career planning, skill development and interview preparation into one unified student ecosystem.

We believe every student deserves an opportunity to understand their potential, improve their abilities and prepare for a brighter future.

---

## 🤝 Contributing

Contributions, suggestions and improvements are welcome!

If you want to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Test your implementation.
5. Submit a Pull Request.

Every meaningful contribution helps improve Guidio AI.

---

## ⭐ Support Guidio AI

If you find Guidio AI useful, please consider:

- Giving this repository a ⭐ Star.
- Sharing the project with other students.
- Reporting bugs and suggesting improvements.
- Contributing to the project.

Your support helps the project grow!

---

<p align="center">
  <h2 align="center">🚀 Guidio AI</h2>
  <p align="center">
    <strong>Learn. Practise. Improve. Grow.</strong>
  </p>
  <p align="center">
    Making AI-powered career preparation accessible to everyone.
  </p>
  <br />
  Built with ❤️ for students and future professionals.
</p>