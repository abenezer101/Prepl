# Prepl Workspace

Prepl is an AI-native, autonomous recruiting and interview intelligence platform built for early-stage startups and technical founders (B2B) and emerging tech talent/candidates (B2C).

This monorepo coordinates the Next.js 15 frontend and Python FastAPI backend, integrated with Google Antigravity 2.0 multi-agent orchestration for autonomous hiring pipelines.

## Repository Structure

```
prepl-workspace/
├── .gitignore                   # Excludes dependencies, configs, and Obsidian vault
├── README.md                    # Core project orchestration document
├── package.json                 # Monorepo workspaces manager and launch runner
│
├── frontend/                    # Next.js 15 + Tailwind CSS + daisyUI Web App
│   ├── package.json
│   ├── tailwind.config.js       # Custom design tokens & strict rounded-[5px] rules
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── src/
│   │   ├── app/                 # Next.js App Router core UI grids & layouts
│   │   ├── components/          # 13 Landing page presentation modules and atoms
│   │   ├── hooks/               # MediaPipe camera & audio stream hooks
│   │   └── utils/               # Tailwind merge & styling helpers
│
└── backend/                     # FastAPI Python Server + Google Antigravity 2.0
    ├── requirements.txt         # FastAPI, Google GenAI SDK dependencies
    ├── main.py                  # API service entrypoint
    ├── .env                     # Local API environment settings
    └── app/                     # Multi-Agent orchestrators, services, schemas
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### Installation
1. Clone the repository and navigate into the root directory.
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Set up the Python virtual environment and install backend requirements:
   ```bash
   cd backend
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   pip install -r requirements.txt
   ```

### Execution
Run the Next.js development server from the root directory:
```bash
npm run dev
```

Launch the FastAPI backend server:
```bash
npm run backend:dev
```
Or directly from the backend directory:
```bash
python -m uvicorn backend.main:app --reload
```
