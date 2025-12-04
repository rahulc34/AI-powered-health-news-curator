AI-Based Health News Curator – README
1. Project Setup & Demo
Web Setup
npm install
npm start

Runs the React app locally (e.g., http://localhost:3000).

2. Problem Understanding

The goal is to build an AI-powered health news curator that converts complex health articles into simple, digestible summaries. Users should be able to see short TL;DR summaries, key takeaways, and expanded plain-language rewrites of articles.

Core Tasks:

Load mock health news articles (from JSON or RSS dump).

Summarize each article using AI:

2-line TL;DR

3 concise key takeaways

Display a scrollable feed with:

Pagination

Pull-to-refresh / regenerate states

Allow expanding an article to show a simplified, friendly rewrite created by AI.

Assumptions Made:

Mock article data is acceptable (no real API required).

Summaries do not need to match word-for-word on regeneration.

The AI should avoid medical advice; it only summarizes existing published articles.

No backend or authentication is required.

3. AI Prompts & Iterations
Initial Prompt Attempt

Early prompts asked for summaries but produced:

Irregular bullet formatting

More than 2 TL;DR lines

Highly technical language

Refined Summary Prompt
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

ARTICLE:
{{articleText}}


This produced consistent length, structure, and easier-to-render results.

Refined Expanded Article Prompt
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

ARTICLE:
{{articleText}}


This ensured clean structure and predictable UI behavior.

4. Architecture & Code Structure
Navigation

Web:
App.tsx manages navigation through React Router:

/ → Load 10 News on Screen 

/explain → Detailed Article View

File & Module Structure
src/
  App.tsx                      # Navigation
  screens/
    LoadNewsScreen.tsx
    FeedScreen.tsx
    ArticleDetailScreen.tsx
  components/
    ArticleCard.tsx
  context/
    NewsContext.tsx
  services/
    aiService.ts               # Handles AI calls
    mockNewsService.ts         # Loads sample articles
  assets/
    mockNews.json
  types/
    news.ts                    # Type definitions

State Management

React Context + custom hook

Provides:

loading & error states

regenerate summary updates

5. Screenshots / Screen Recording
  

6. Known Issues / Improvements
Current Limitations

AI summarization runs sequentially → slow for large batches

Pagination resets after refresh

No detailed retry handling for failed AI requests

Expanded rewrite may occasionally be too long

Basic styling (no dark mode by default)

Possible Improvements

Cache summaries locally

Improve scrolling state preservation

Add UI skeleton loaders & shimmer effects

Implement topic filters or search

Add user preferences (font size, dark/light mode)
