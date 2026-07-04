
# AI Resume Review Agent (CVSpark)

🔗 **Live Demo:** [ai-resume-review-agent-2026-gtlo.vercel.app](https://ai-resume-review-agent-2026-gtlo.vercel.app)

AI Resume Review Agent is a complete, modern, and production-ready web application built to analyze resumes using artificial intelligence. The app extracts text from user-uploaded PDFs fully in the browser and leverages Google Gemini AI to generate structured assessments, optimization suggestions, role compatibility ratings, and a step-by-step action plan.

## 🚀 Key Features

1. **Local PDF Text Extraction**: Uses `pdfjs-dist` to parse layout text streams directly in the client browser, securing user documents and avoiding third-party server exposure.
2. **ATS Scanning & Readability Metrics**: Provides immediate ratings out of 100 for overall quality and ATS compliance, showcasing core strengths and areas of improvements.
3. **Core Assessments**: Displays feedback matrices for Technical Skills, Project Quality, Education, Certifications, Formatting, Grammar, and Keyword Density.
4. **Interactive Rewrite Suggestions**:
   - Suggested values for Missing Skills & Missing Keywords.
   - Recommended Action Verb replacements.
   - Before/after descriptions showing how to structure accomplishment records.
   - Ready-to-copy Career Summaries and Skills Section layouts.
5. **Job Role Suitability Matcher**: Dynamically recalculates scores, identifies missing skills, and yields tailored guidance for four core roles:
   - Software Engineer
   - Java Developer
   - Frontend Developer
   - Full Stack Developer
6. **Action Plan Timeline**: Lists five priority steps with labeled impact values (High, Medium, Low) to streamline CV updates.
7. **Report Downloads & Prints**:
   - Save review reports as beautifully formatted Markdown documents (.md).
   - Print-optimized layouts tailored for browser Save-to-PDF configurations.

---

## 🛠️ Technology Stack

- **Framework**: React (v19) + Vite
- **Styling**: Tailwind CSS (v4)
- **AI Integration**: Google Gemini AI (via `@google/generative-ai` SDK)
- **PDF Engine**: PDF.js (Client-side, loaded via CDN Web Worker)
- **Icons**: Lucide React

---

## 💻 Installation & Setup

Follow these steps to run the application locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 2. Clone/Copy project files and Install Dependencies
Navigate to the project root directory and install dependencies:
```bash
cd ai-resume-review-agent
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root of the project:
```bash
cp .env.example .env
```
Open the `.env` file and replace the placeholder with your Gemini API Key:
```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key
```
> **Tip**: If you don't have a `.env` configured, you can set your API key directly in the application's UI settings modal at runtime (stored securely in browser `localStorage`).

### 4. Run Development Server
Start the Vite local development server:
```bash
npm run dev
```
Open your browser and navigate to the printed URL (typically `http://localhost:5173`).

---

## 📦 Deployment Instructions

Since this is a client-side React single-page application with no database or backend servers, it can be deployed for free on static hosting sites.

### Build Production Artifacts
Generate optimized static files:
```bash
npm run build
```
This produces a `dist/` directory containing your index.html, JS, and CSS bundles.

### Hosting Options

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root folder.
3. Add `VITE_GEMINI_API_KEY` as a project Environment Variable in the Vercel dashboard.

#### Netlify
1. Drag and drop the compiled `dist/` folder into the Netlify UI.
2. Or use Netlify CLI and set environment variables in the site configuration screen.

#### GitHub Pages
1. Install `gh-pages` helper: `npm install gh-pages --save-dev`
2. Update `vite.config.js` to include the repository path as the base directory: `base: '/repo-name/'`.
3. Set up the publish script in `package.json` and deploy.

---

## 📸 Interface Screenshots

* **Landing Hero Section**: Modern dark-theme greeting with glowing abstract backgrounds and feature summaries.
* **Resume Upload**: Sleek dashed drop zones validating and listing incoming files securely.
* **Analysis Dashboard**: Circular SVGs grading resume criteria alongside strengths, weaknesses, and detail cards.
* **AI Rewrite Panels**: Interactive side-by-side revision boxes with one-click copy helper buttons.
* **Role Alignment Panel**: Dynamic select box computing role suitability scores on the fly.
* **Action Plan**: Vertical timeline ranking CV revision tasks by priority.



