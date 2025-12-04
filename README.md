# AI-Based Health News Curator

An AI-powered tool that transforms complex health news articles into simple, digestible summaries — including TL;DRs, key takeaways, and friendly rewritten explanations.

---

## 1. Project Setup & Demo

### Web Setup
```bash
npm install
npm start
```
This runs the React app locally at **http://localhost:3000**.

## 2. Problem Understanding

The purpose of this project is to build an **AI-driven health news curator** that helps users quickly understand health-related content without reading long or technical articles.

### Core Tasks
- Load **mock health news articles** (JSON or RSS dump)
- Summarize each article using AI:
  - **2-line TL;DR**
  - **3 short key takeaways**
- Display a scrollable feed with:
  - Pagination
  - Pull-to-refresh / regenerate summary behavior
- Provide an expanded article view with a **simplified AI rewrite**

### Assumptions
- Mock article data is sufficient (no external API required)
- Regenerated summaries may vary slightly (acceptable)
- AI should avoid medical advice; summarization only
- No backend/authentication needed — frontend-only project

---

## 3. AI Prompts & Iterations

### Initial Prompt Issues
Early AI prompts produced:
- Irregular bullet formatting
- More than two TL;DR lines
- Technical, hard-to-understand summaries

---

### Refined Summary Prompt
\`\`\`
You are a helpful assistant that summarizes health news for everyday readers.

Given the article below, produce ONLY the following JSON:

{
  "tldr": [
    "First line of TLDR (max 140 characters).",
    "Second line of TLDR (max 140 characters)."
  ],
  "takeaways": [
    "Short key takeaway 1 (max 160 characters).",
    "Short key takeaway 2 (max 160 characters).",
    "Short key takeaway 3 (max 160 characters)."
  ]
}

Rules:
- Use plain, friendly language.
- Avoid jargon or explain briefly.
- No extra text outside the JSON.

ARTICLE: {{articleText}}
\`\`\`

---

### Refined Expanded Article Prompt
\`\`\`
Rewrite this article for a general audience.

Rules:
- Friendly tone
- Short paragraphs
- Use headings and bullet points
- Max length ~600 words
- No medical advice
- Explain technical terms briefly

Output format (Markdown):

# Title: {{title}}

## What this is about
(2–3 short sentences)

## Key points
- Bullet point 1
- Bullet point 2
- Bullet point 3

## Why it matters
(2–4 sentences)

## Anything to watch out for
(brief cautions, no personal medical advice)

ARTICLE: {{articleText}}
\`\`\`

---

## 4. Architecture & Code Structure

### Navigation
- **Web:** `App.tsx` (React Router)
  - `/` → Load 10 News

---

### Folder Structure
\`\`\`
src/
  App.tsx
  screens/
    ExplanationScreen.tsx
    FeedScreen.tsx
  components/
    ArticleCard.tsx
    ExplainModel.tsx
    Loader.tsx
  context/
    ArticleContext.tsx
  types/
    Article.ts
  hooks/
    useArticles.ts
  api/
    aiService.ts
\`\`\`

---

### State Management
Using **React Context + hook**:
- Global article state
- Loading & error states
- Summary regeneration
- 
---

## 5. Known Issues / Improvements

### Current Limitations
- AI summarization runs sequentially → slow for many articles
- Pagination resets on refresh
- No retry UI for failed AI summaries
- Expanded rewrite may vary in length
- Basic UI styling (no themes, animations)

### Possible Improvements
- Add caching for AI summaries
- Preserve scroll position during refresh
- Implement skeleton loading animations
- Add filters/search UI
- Add user preferences (font size, dark/light mode)
