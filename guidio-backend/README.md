# 🚀 Guidio AI — Backend

<p align="center">
  <strong>The Intelligent Backend Powering Guidio AI</strong>
</p>

<p align="center">
  A secure, modular and AI-powered REST API for student career guidance, skill development, mock interviews and personalized learning assistance.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/AI_Powered-7C3AED?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Free_to_Use-16A34A?style=for-the-badge" />
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## 🌟 Overview

**Guidio AI Backend** is the server-side application powering Guidio AI, an AI-powered career guidance and student assistance platform.

It provides the core services responsible for authentication, student data management, AI generation, interview evaluation, career planning, skill-gap analysis and background processing.

The backend is designed as a modular monolith using Node.js and Express, with a dedicated AI provider layer that supports multiple AI services.

### 🎯 What Does It Power?

- 🤖 AI Student Assistant
- 🎤 AI Mock Interview
- 📊 AI Skill Gap Analysis
- 🎯 AI Career Guidance
- 📈 Student Dashboard
- 👤 Student Profile Management
- 🔔 Notifications and Weekly Reminders

### Our Goal

To provide a reliable, secure and accessible backend that makes AI-powered student development available without requiring students to purchase a subscription to use Guidio AI.

> **Important:** The application is free to use, but third-party services and AI providers may impose usage limits.

---

## ✨ Features

### 1. 🤖 AI Student Assistant

- AI-powered academic and technical assistance.
- Conversation creation and management.
- Persistent conversation history.
- Streaming AI responses using Server-Sent Events (SSE).
- Partial response preservation when a stream is interrupted.
- Conversation deletion.
- Structured AI response handling.

### 2. 🎤 AI Mock Interview

- Technical interview sessions.
- HR interview sessions.
- Mixed interview sessions.
- Beginner, Medium and Hard difficulty levels.
- AI-generated interview questions.
- Individual answer evaluation.
- Feedback and performance scores.
- Final interview summary.
- Interview history.

### 3. 📊 AI Skill Gap Analysis

- Analyzes the student's saved profile.
- Calculates skill match information.
- Identifies existing strengths.
- Prioritizes missing skills.
- Generates personalized learning recommendations.
- Suggests relevant projects.
- Produces structured learning plans.
- Maintains report history.

### 4. 🎯 AI Career Guidance

- Personalized career planning.
- Career readiness information.
- Recommended career roles.
- Alternative job roles.
- Learning roadmaps.
- Project recommendations.
- Interview preparation topics.
- Career plan history.

### 5. 🔐 Authentication & Authorization

- Clerk authentication using `@clerk/express`.
- Verification of session tokens.
- Protected API routes.
- User-specific database queries.
- Student data isolation.
- Secure user synchronization.

### 6. 🗄️ Database Management

- MongoDB Atlas integration.
- Prisma ORM 6.
- Structured data models.
- Database relationships.
- Cascade deletion where appropriate.
- Unique indexes.
- Query indexes for history and user records.

### 7. ⚙️ Background Jobs

- Inngest integration.
- Background function handling.
- Weekly career-readiness reminders.
- Monday 09:00 India-time reminder scheduling.

### 8. 🛡️ Security & Reliability

- Helmet security headers.
- CORS origin allow-list.
- Express rate limiting.
- Zod request validation.
- Centralized error handling.
- Structured logging.
- Secret and personal-data redaction.
- Request and AI timeouts.
- Graceful server shutdown.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Runtime | Node.js 20 or newer (22 recommended) |
| Language | JavaScript ES Modules |
| Backend Framework | Express 5 |
| Database | MongoDB Atlas |
| ORM | Prisma ORM 6 |
| Authentication | Clerk |
| Primary AI | Google Gemini |
| Fallback AI | Groq |
| Optional Local AI | Ollama |
| Background Jobs | Inngest |
| Validation | Zod |
| Security | Helmet |
| CORS | Express CORS |
| Rate Limiting | express-rate-limit |
| Testing | Node.js built-in test runner |
| Hosting | Render |

---

## 🏗️ Architecture

Guidio AI follows a modular monolithic backend architecture.

Each layer has a specific responsibility, helping keep the application organized, maintainable and easier to extend.

### Request Flow

```text
                 CLIENT APPLICATION
                         |
                         v
                    API REQUEST
                         |
                         v
                       ROUTES
                         |
                         v
                     MIDDLEWARE
                  /       |       \
                 /        |        \
            AUTHENTICATION VALIDATION
                         |
                         v
                    CONTROLLERS
                         |
                         v
                      SERVICES
                    /         \
                   /           \
                  v             v
              DATABASE       AI SERVICE
                  |              |
                  v              v
              PRISMA       PROVIDER MANAGER
                  |              |
                  v         +----+----+
               MONGODB     |    |    |
                           v    v    v
                        GEMINI GROQ OLLAMA
```

### Architecture Principles

- Routes define API endpoints.
- Middleware handles authentication, validation and rate limits.
- Controllers handle HTTP requests and responses.
- Services contain business logic and database access.
- Prisma manages database operations.
- The AI layer handles provider selection and AI generation.
- Background functions are managed through Inngest.

### Dedicated AI Architecture

```text
              FEATURE SERVICES
                     |
                     v
                  aiService
                     |
                     v
              PROVIDER MANAGER
                     |
             +-------+-------+
             |       |       |
             v       v       v
           GEMINI   GROQ   OLLAMA
           PRIMARY FALLBACK LOCAL
             |       |       |
             +-------+-------+
                     |
                     v
              AI RESPONSE
                     |
                     v
              ZOD VALIDATION
                     |
                     v
              FEATURE SERVICE
```

**Important architectural decision:** Feature services never import individual AI provider SDKs. Switching or adding a provider only requires changes within `src/ai/`.

---

## 📁 Directory Structure

```text
guidio-backend/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   │
│   ├── ai/
│   │   ├── providers/
│   │   │   ├── gemini-provider.js
│   │   │   ├── groq-provider.js
│   │   │   ├── local-provider.js
│   │   │   └── http-utils.js
│   │   │
│   │   ├── ai-provider-manager.js
│   │   ├── ai-service.js
│   │   ├── ai-config.js
│   │   ├── ai-errors.js
│   │   ├── ai-response.js
│   │   ├── *-prompt.js
│   │   └── *-schema.js
│   │
│   ├── config/
│   │   ├── env.js
│   │   └── prisma.js
│   │
│   ├── controllers/
│   │
│   ├── inngest/
│   │
│   ├── middleware/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── utils/
│   │   ├── logger.js
│   │   ├── api-response.js
│   │   ├── app-error.js
│   │   └── lifecycle.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── prisma.config.ts
└── README.md
```

---

## ⚙️ Installation

Follow these steps to run the Guidio AI backend locally.

### Prerequisites

Make sure you have:

- Node.js 20 or newer (Node.js 22 recommended).
- npm.
- Git.
- VS Code (recommended).
- MongoDB Atlas account.
- Clerk account.
- Google AI Studio API key or another supported AI provider.
- Groq account if you want to configure the fallback provider.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into your backend folder:

```bash
cd guidio-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

### 4. Configure Environment Variables

Open the `.env` file and configure your MongoDB, Clerk and AI provider credentials.

See the complete environment-variable reference below.

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Sync the Database Schema

```bash
npm run db:push
```

This synchronizes the Prisma schema with MongoDB and creates the required collections and indexes.

**Note:** Read Prisma's output before confirming any schema changes, especially if it warns about existing data or unique indexes.

---

## 🔑 Environment Variables

All environment variables are validated when the server starts.

If required configuration is missing or invalid, the server reports the variable names without exposing their values.

The `.env.example` file is the configuration template.

### Complete Environment Variable Reference

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `NODE_ENV` | No | `development` | Runtime environment |
| `PORT` | No | `5000` | Server port |
| `LOG_LEVEL` | No | Environment-dependent | Logging level |
| `CORS_ORIGINS` | Production | Localhost origin | Allowed frontend origins |
| `TRUST_PROXY` | No | `1` production, `0` local | Reverse proxy configuration |
| `DATABASE_URL` | Yes | — | MongoDB connection string |
| `CLERK_SECRET_KEY` | Yes | — | Clerk secret key |
| `CLERK_PUBLISHABLE_KEY` | Yes | — | Clerk publishable key |
| `GEMINI_API_KEY` | One AI provider required | — | Gemini API key |
| `GEMINI_MODEL` | No | `gemini-3.6-flash` | Gemini model |
| `GROQ_API_KEY` | One AI provider required | — | Groq API key |
| `GROQ_MODEL` | No | `openai/gpt-oss-120b` | Groq model |
| `OLLAMA_BASE_URL` | One AI provider required | — | Local Ollama endpoint |
| `OLLAMA_MODEL` | No | `llama3.2` | Local model name |
| `OLLAMA_NUM_CTX` | No | `8192` | Local context size |
| `AI_PROVIDER_ORDER` | No | `gemini,groq,ollama` | Provider execution order |
| `AI_TIMEOUT_MS` | No | `30000` | Provider timeout |
| `AI_LOCAL_TIMEOUT_MS` | No | `120000` | Ollama timeout |
| `AI_STREAM_IDLE_TIMEOUT_MS` | No | `30000` | Streaming idle timeout |
| `AI_MAX_RETRIES` | No | `1` | Additional retry attempts |
| `INNGEST_DEV` | No | — | Local Inngest development mode |
| `INNGEST_EVENT_KEY` | Production | — | Inngest event key |
| `INNGEST_SIGNING_KEY` | Production | — | Inngest signing key |

At least one of these must be configured:

- `GEMINI_API_KEY`
- `GROQ_API_KEY`
- `OLLAMA_BASE_URL`

### Example Configuration

```env
NODE_ENV=development
PORT=5000
LOG_LEVEL=debug

CORS_ORIGINS=http://localhost:5173
TRUST_PROXY=0

DATABASE_URL=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/guidio-ai

CLERK_SECRET_KEY=sk_test_your_secret_key
CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-120b

AI_PROVIDER_ORDER=gemini,groq,ollama
AI_TIMEOUT_MS=30000
AI_LOCAL_TIMEOUT_MS=120000
AI_STREAM_IDLE_TIMEOUT_MS=30000
AI_MAX_RETRIES=1

INNGEST_DEV=1
```

This is an example only. Use the exact variable names and valid model IDs supported by your current backend configuration and provider accounts.

**Security:** Never upload your real `.env` file to GitHub.

---

## ▶️ Local Development

### Start the Development Server

```bash
npm run dev
```

The backend should be available at:

```text
http://localhost:5000
```

### Start in Production Mode

```bash
npm start
```

### Run Automated Tests

```bash
npm test
```

### Start Local Inngest Development Server

In another terminal:

```bash
npx inngest-cli@latest dev
```

Keep `INNGEST_DEV=1` in your local `.env` when using the local Inngest development setup.

### Check Backend Health

Open:

```text
http://localhost:5000/api/health
```

Or use:

```bash
curl http://localhost:5000/api/health
```

---

## 🔌 API Reference

Guidio AI exposes REST API endpoints for its student-facing features.

All routes except `/api/health` and `/api/inngest` require authentication.

### Authentication Header

Protected requests must include a valid Clerk session token.

```http
Authorization: Bearer <Clerk session token>
```

### Standard Success Response

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

### Standard Error Response

```json
{
  "success": false,
  "message": "Readable error message",
  "errors": null,
  "code": "unauthorized"
}
```

### Main API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Public backend health check |
| GET | `/api/users/me` | Synchronize and retrieve current user |
| GET | `/api/profile` | Retrieve student profile |
| PUT | `/api/profile` | Create or update student profile |
| GET | `/api/dashboard` | Dashboard information |
| GET | `/api/assistant/conversations` | List conversations |
| POST | `/api/assistant/conversations` | Create conversation |
| GET | `/api/assistant/conversations/:conversationId` | Retrieve conversation |
| POST | `/api/assistant/conversations/:conversationId/messages` | Send streamed AI message |
| DELETE | `/api/assistant/conversations/:conversationId` | Delete conversation |
| POST | `/api/career/plans` | Generate career plan |
| GET | `/api/career/plans` | List career plans |
| GET | `/api/career/plans/:planId` | Retrieve career plan |
| POST | `/api/skill-gap/reports` | Generate skill-gap report |
| GET | `/api/skill-gap/reports` | List skill-gap reports |
| GET | `/api/skill-gap/reports/:reportId` | Retrieve skill-gap report |
| POST | `/api/interviews` | Start mock interview |
| GET | `/api/interviews` | Retrieve interview history |
| GET | `/api/interviews/:sessionId` | Retrieve interview session |
| POST | `/api/interviews/:sessionId/questions/:questionId/answer` | Submit interview answer |
| GET | `/api/reminders` | Retrieve notifications |
| PATCH | `/api/reminders/:reminderId/read` | Mark reminder as read |
| PATCH | `/api/reminders/read-all` | Mark all reminders as read |
| Various | `/api/inngest` | Inngest background job endpoint |

### Request Examples

**Update Student Profile**

```http
PUT /api/profile
Content-Type: application/json
Authorization: Bearer <Clerk session token>
```

Example body:

```json
{
  "education": "Undergraduate",
  "college": "Example College",
  "degree": "B.Tech",
  "graduationYear": 2027,
  "experienceLevel": "Beginner",
  "targetRole": "Full Stack Developer",
  "skills": ["JavaScript", "React", "Node.js"],
  "interests": ["Web Development", "Artificial Intelligence"]
}
```

**Start a Mock Interview**

```http
POST /api/interviews
Content-Type: application/json
Authorization: Bearer <Clerk session token>
```

Example body:

```json
{
  "interviewType": "Technical",
  "targetRole": "Software Developer",
  "difficulty": "Medium"
}
```

**Submit an Interview Answer**

```http
POST /api/interviews/:sessionId/questions/:questionId/answer
Content-Type: application/json
Authorization: Bearer <Clerk session token>
```

Example body:

```json
{
  "answerText": "Your interview answer goes here."
}
```

---

## 🌊 AI Assistant Streaming

The AI Assistant uses Server-Sent Events (SSE) to stream responses.

The message endpoint returns:

```http
Content-Type: text/event-stream
```

### Event Format

```text
data: {"type":"start"}

data: {"type":"chunk","text":"Hello"}

data: {"type":"done","data":{...saved messages...}}

data: {"type":"error","message":"...","code":"rate_limited","retryAfterSeconds":30}
```

### Streaming Behaviour

- The client receives responses progressively.
- A completed response is saved to the database.
- If the browser disconnects, the AI request is cancelled.
- Partial responses are preserved when streaming is interrupted.
- Errors occurring before streaming begins are returned as normal JSON responses.
- Provider failover is possible only before the first response chunk has been sent.

This approach improves responsiveness while avoiding unnecessary AI requests after a client disconnects.

---

## 🩺 Health Check

Endpoint:

```http
GET /api/health
```

Example response:

```json
{
  "success": true,
  "message": "Guidio AI backend is running",
  "data": {
    "status": "healthy",
    "database": "up",
    "ai": {
      "status": "up",
      "providers": [
        {
          "provider": "gemini",
          "available": true
        }
      ]
    },
    "service": "Guidio AI API",
    "uptimeSeconds": 120,
    "timestamp": "2026-01-01T00:00:00.000Z"
  }
}
```

### Health Status

| HTTP Status | Meaning |
|---|---|
| `200` | Database is reachable |
| `503` | Database unavailable or server shutting down |

AI availability may be degraded even when the database is healthy. The health endpoint reports provider availability without exposing secret configuration.

The database health result is cached for 10 seconds.

---

## 🚦 Rate Limiting

The backend uses rate limiting to protect API resources.

| Limit | Applies To | Time Window |
|---|---|---|
| 300 requests | All `/api` routes per IP | 15 minutes |
| 30 requests | Assistant messages, career plans and skill-gap reports per user | 15 minutes |
| 50 requests | Starting interviews and submitting answers per user | 15 minutes |

When a rate limit is exceeded, the API returns:

```http
429 Too Many Requests
```

A `Retry-After` header is included when a wait time is known.

---

## 🧠 AI Providers & Automatic Failover

Guidio AI supports multiple AI providers through a dedicated provider manager.

| Provider | Role | Configuration |
|---|---|---|
| Google Gemini | Primary provider | `GEMINI_API_KEY` |
| Groq | Fallback provider | `GROQ_API_KEY` |
| Ollama | Optional local provider | `OLLAMA_BASE_URL` |

### Default Provider Order

```text
         AI REQUEST
              |
              v
         GOOGLE GEMINI
              |
        +-----+-----+
        |           |
      SUCCESS     FAILURE
        |           |
        v           v
      RESULT       GROQ
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
                  RESULT    AI ERROR
```

The provider order can be changed through:

```env
AI_PROVIDER_ORDER=gemini,groq,ollama
```

Providers that are not configured are skipped.

### Provider Manager Behaviour

| Situation | Backend Behaviour |
|---|---|
| HTTP 429 | Pauses the provider according to `Retry-After`, then tries the next provider |
| Temporary 5xx or network errors | Pauses a provider after three consecutive failures |
| Timeout | Handles the failure using configured timeout and retry rules |
| Invalid API key | Pauses the affected provider for 15 minutes |
| Unknown model | Pauses the affected provider for 15 minutes |
| Invalid request | Does not automatically fail over |
| AI safety refusal | Does not automatically fail over |
| Client cancellation | Does not automatically fail over |
| Streaming failure before first chunk | Can try another provider |
| Streaming failure after first chunk | Preserves the partial answer |

### Structured AI Responses

The backend validates generated structured responses using Zod.

- Gemini uses JSON schema mode.
- Groq uses JSON mode with the schema in the prompt.
- Ollama uses its native JSON-schema format.
- Invalid structured responses can trigger fallback to another provider.

### Model Configuration

Model names may change or be retired by providers.

The configured model defaults should be checked against the current provider documentation and the models available to your API account.

For Groq, you can inspect available models using:

```bash
curl -s https://api.groq.com/openai/v1/models -H "Authorization: Bearer $GROQ_API_KEY"
```

In Windows PowerShell, use:

```powershell
$env:GROQ_API_KEY
```

### Fair Usage

Guidio AI does not rotate API keys or create accounts to bypass provider limits.

The application uses configured providers according to their available quotas and terms.

---

## 🗄️ Database

Guidio AI uses **MongoDB Atlas with Prisma ORM 6**.

### Database Models

The backend includes the following data models:

| Model | Purpose |
|---|---|
| `User` | Authenticated student |
| `StudentProfile` | Student education and career information |
| `AssistantConversation` | AI conversation |
| `AssistantMessage` | Individual conversation messages |
| `CareerPlan` | Generated career guidance |
| `SkillGapReport` | Generated skill-gap analysis |
| `InterviewSession` | Mock interview session |
| `InterviewQuestion` | Generated interview questions |
| `InterviewAnswer` | Student interview answers |
| `InterviewImprovementSummary` | Interview improvement summary |
| `WeeklyReadinessReminder` | Weekly readiness reminders |

### Database Commands

Generate Prisma Client:

```bash
npx prisma generate
```

Synchronize the database schema:

```bash
npm run db:push
```

### Important Database Notes

- MongoDB does not use SQL migrations in this setup.
- Prisma `db:push` synchronizes the schema and indexes.
- It does not automatically wipe database data.
- Unique indexes may require attention if existing duplicate records are present.
- Never run destructive database reset commands against production data without a verified backup and a clear recovery plan.

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account.
2. Create a cluster.
3. Create a database user.
4. Configure Network Access.
5. Copy the MongoDB connection string.
6. Add it to the backend `.env` file.

Example:

```env
DATABASE_URL=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/guidio-ai?retryWrites=true&w=majority
```

URL-encode special characters in database passwords.

---

## 🧪 Testing

Guidio AI uses Node.js's built-in test runner.

Run all automated tests:

```bash
npm test
```

The documented backend test suite contains 68 automated tests.

### What Is Tested?

**AI Provider Layer**

- Gemini adapter.
- Groq adapter.
- Ollama adapter.
- Provider failover.
- Cooldown behaviour.
- Retry-After handling.
- Timeouts.
- Retries.
- Streaming.
- Structured response validation.

**Reliability**

- Logger redaction.
- Health reporting.
- Profile service using a fake Prisma object.

### Important Testing Notes

Automated tests do not require:

- A real MongoDB database.
- Live AI provider keys.
- Internet access.

However, passing automated tests does not prove that your actual Clerk instance, MongoDB cluster, AI credentials or deployed environment are configured correctly.

### Manual Integration Testing

After configuring the backend, verify:

1. Sign in through Clerk.
2. Synchronize the user.
3. Save a student profile.
4. Send an AI Assistant message.
5. Generate a career plan.
6. Generate a skill-gap report.
7. Start a mock interview.
8. Submit interview answers.
9. View interview feedback.
10. Retrieve dashboard information.
11. Open `/api/health`.

---

## 🌐 Deployment on Render

Guidio AI backend is designed to run on Render.

The repository root includes a `render.yaml` blueprint.

### Deployment Steps

**1. Push Your Code to GitHub**

Make sure your `.env` file is not committed.

**2. Open Render**

Visit:

https://render.com/

**3. Create a New Blueprint or Web Service**

For a Blueprint deployment, connect your GitHub repository and use the existing `render.yaml`.

Alternatively, create a Web Service with the backend directory as its root.

### Render Configuration

| Setting | Value |
|---|---|
| Root Directory | `server` or the actual backend repository root |
| Runtime | Node |
| Build Command | `npm ci && npx prisma generate` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |
| Instance Type | Free, if available |

If this repository itself is named `guidio-backend`, its root directory is already the backend directory. Do not enter a nonexistent `server` subdirectory.

### Environment Variables on Render

Configure your secret values in the Render dashboard:

```env
NODE_ENV=production
DATABASE_URL=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

If using Inngest Cloud, also configure:

```env
INNGEST_EVENT_KEY=your_event_key
INNGEST_SIGNING_KEY=your_signing_key
```

Do not manually set `PORT` on Render. Render supplies it automatically.

### 4. Deploy

After configuration, deploy the service.

Your health endpoint should be available at:

```text
https://YOUR-RENDER-SERVICE.onrender.com/api/health
```

### 5. Configure Inngest Cloud

If you use Inngest Cloud, synchronize your application using:

```text
https://YOUR-RENDER-SERVICE.onrender.com/api/inngest
```

### Production Behaviour

The server:

- Listens on `0.0.0.0`.
- Uses the port provided by Render.
- Opens its listening port before connecting to the database in the background.
- Handles `SIGTERM` during deployment.
- Returns `503` from the health check while shutting down.
- Allows running requests time to finish.
- Disconnects Prisma before exiting.

---

## ⚠️ Free-Tier Limitations

Guidio AI aims to remain free to use. However, its infrastructure depends on third-party services.

| Service | Potential Limitation |
|---|---|
| Render | Free services can spin down after inactivity |
| MongoDB Atlas | Free storage and connection limits |
| Google Gemini | Model-specific request quotas |
| Groq | API rate limits and model availability |
| Clerk | Development and production restrictions |
| Inngest | Plan-specific execution and event limits |
| Ollama | Requires a separately running local machine |

### Render Free Services

Free web services may:

- Spin down after 15 minutes without inbound traffic.
- Take around a minute to wake up.
- Have limited monthly instance hours.
- Restart without warning.
- Have no persistent disk.

The first request after a service sleeps may be slow.

### AI Provider Limits

Google Gemini and Groq may impose:

- Per-minute limits.
- Daily quotas.
- Model-specific restrictions.
- Temporary service restrictions.

When all configured providers are unavailable, users receive an appropriate error rather than an unlimited-use guarantee.

### Clerk Development Mode

Clerk Development Mode is intended for development and testing, not a public production launch.

For a real public deployment, review Clerk's current production requirements:

https://clerk.com/docs/deployments/environments

### MongoDB Atlas

MongoDB Atlas free clusters have storage and connection limits. Check the current Atlas documentation for the applicable limits.

---

## 🔒 Security & Privacy

Security is an important part of the Guidio AI backend.

### Authentication

- Private routes verify Clerk session tokens.
- Malformed or invalid tokens are rejected.
- Database queries are scoped to the authenticated user.
- Internal user IDs are obtained from the verified Clerk identity.

### Request Protection

- Zod validates incoming data.
- Request bodies are limited to 1 MB.
- Helmet configures security headers.
- CORS uses an explicit origin allow-list.
- Rate limiting protects API resources.

### Secret Protection

Never expose these values:

- `CLERK_SECRET_KEY`
- `DATABASE_URL`
- `GEMINI_API_KEY`
- `GROQ_API_KEY`
- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`

### Logging

The structured logger removes sensitive information, including:

- API tokens.
- Secret keys.
- Database connection strings.
- Email addresses.
- Names.
- Chat messages.
- Prompt text.

Unexpected production errors return generic messages while detailed information stays in server logs.

### If a Secret Is Exposed

If a private key is accidentally uploaded or shared:

1. Rotate the exposed credential immediately.
2. Update the local `.env` file.
3. Update the corresponding Render environment variable.
4. Redeploy the backend.
5. Review Git history if the secret was committed.

Deleting a secret from the latest Git commit does not remove it from previous Git history.

---

## 🐛 Troubleshooting

| Problem | Solution |
|---|---|
| `npm` is not recognized | Install Node.js and reopen the terminal |
| `prisma` is not recognized | Use `npx prisma generate` |
| Prisma Client error | Run `npx prisma generate` |
| Database connection failed | Verify `DATABASE_URL` and Atlas Network Access |
| Clerk returns 401 | Check that the frontend and backend use matching Clerk keys |
| CORS error | Add the exact frontend origin to `CORS_ORIGINS` |
| AI returns 429 | Check provider quota and wait for the cooldown |
| AI returns 503 | Check configured AI keys and provider availability |
| AI model not found | Verify the model ID in the provider dashboard |
| Streaming does not work | Check the client SSE implementation and server logs |
| Inngest functions are not running | Check Inngest development mode or Cloud configuration |
| Render health check fails | Inspect deployment logs and `/api/health` |
| First Render request is slow | The free service may have been sleeping |
| `npm test` fails | Check the test output and Node.js version |

---

## 🔄 GitHub Workflow

### First-Time Setup

```bash
git init
git add .
git status
git commit -m "Initial backend setup"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

### Daily Development

Create a feature branch:

```bash
git checkout -b feature/feature-name
```

After making changes:

```bash
npm test
```

Then commit:

```bash
git add .
git commit -m "Describe your backend changes"
git push -u origin feature/feature-name
```

Review the changes and create a Pull Request on GitHub.

### Check Tracked Environment Files

Windows PowerShell:

```powershell
git ls-files | findstr /i "\.env"
```

Only safe example files containing placeholders should be tracked.

---

## 🚀 Future Vision

The Guidio AI backend is designed to support the continued development of an intelligent student ecosystem.

Future improvements can focus on:

- More reliable AI generation.
- Better provider monitoring.
- Improved career recommendations.
- More detailed interview evaluations.
- Better student progress tracking.
- Optimized database queries.
- Improved background processing.
- Stronger application observability.

The goal is to make the backend reliable, maintainable and scalable while keeping Guidio AI accessible to students.

---

## 🤝 Contributing

Contributions, bug reports and suggestions are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run the automated tests.
5. Submit a Pull Request.

Please avoid committing credentials, private configuration files or student data.

---

## ⭐ Support Guidio AI

If you find this project useful:

- Give the repository a ⭐ Star.
- Share Guidio AI with other students.
- Report bugs and suggest improvements.
- Contribute to the project.

Every contribution helps make the platform better.

---

<p align="center">
  <h2>🚀 Guidio AI</h2>
  <strong>Learn. Practise. Improve. Grow.</strong>
  <br /><br />
  Building accessible AI-powered career preparation for students.
  <br /><br />
  Made with ❤️ for students and future professionals.
</p>