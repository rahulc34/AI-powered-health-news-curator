# 📘 AI-Based Health News Curator  
A web-based application that loads health news, summarizes each article using AI, and provides a friendly explanation on demand. Built with **React**, **TypeScript**, **Express**, and **OpenAI**.

---

## 1. Project Setup & Demo

### 🖥 Web Frontend
```bash
cd frontend
npm install
npm run dev
```

Runs at:  
👉 http://localhost:5173 (Vite)  
or  
👉 http://localhost:3000 (CRA)

---

### 🛠 Backend (Node + Express)
```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
OPENAI_API_KEY=your_openai_key_here
PORT=5000
```

Backend runs at:  
👉 http://localhost:5000

---

## 2. Problem Understanding

The goal is to build an **AI-powered health news curator** that simplifies complex medical news into easy-to-read summaries and explanations.

### Core Requirements
1. Load mock/RSS health articles  
2. Use AI to generate:  
   - **2-line TL;DR**  
   - **3 key takeaways**  
3. Display summaries in a paginated feed with:  
   - Load More  
   - Pull-to-refresh  
4. When an article is expanded → AI rewrites it in a more friendly way  
5. Ensure consistent formatting and smooth loading states  

### Assumptions
- No database required  
- Mock/RSS data allowed  
- Backend handles all OpenAI calls  
- Explanations cached in memory  
- No user accounts required  

---

## 3. AI Prompts & Iterations

### Initial Prompt for Summaries
```
Generate 10 health news summaries in JSON format. 
Each must include:
- id
- title
- a 2-line TL;DR
- exactly 3 key takeaways
```

### Problems Encountered
- AI returned invalid JSON  
- TL;DR exceeded 2 lines  
- Some responses had more than 3 points  

### Refined Prompt
```
Output ONLY valid JSON.

Return an array of objects:
{
  "id": "<uuid>",
  "title": "<title>",
  "tl_dr": "<2 lines only>",
  "takeaways": ["point1", "point2", "point3"]
}

Do not include markdown or explanations.
```

### Explain Prompt
```
Rewrite this article in simple, friendly language:

  Title: ${article.title}
  TLDR: ${article.tl_dr}
  Key Takeaways:
  - ${article.takeaways.join("\n- ")}

  Output only the rewritten explanation.
```

---

## 4. Architecture & Code Structure

### Frontend Structure
```
frontend/src
├── api/
│   └── aiService.ts
├── components/
│   ├── ArticleCard.tsx
│   ├── ExplainModal.tsx
│   └── Loader.tsx
├── context/
│   ├── ArticleContext.tsx
├── hooks/
│   └── useArticles.ts
├── screens/
│   └── FeedScreen.tsx
├── types/
│   └── Article.ts
└── App.tsx
```

### Backend Structure
```
backend/src
├── routes/
│   └── articleRoutes.ts
│   └── explainRoutes.ts
├── controllers/
│   └── articleController.ts
│   └── explainController.ts
├── services/
│   └── openaiService.ts
├── types/
│   └── Article.ts
├── utils/
└── index.ts
```

---

## 5. Known Issues / Improvements

### Current Limitations
- AI delay may cause slow explanations  
- Pull-to-refresh reloads entire dataset  

### Potential Improvements
- Database or Redis caching  
- Better transitions in modal  
- Retry button for explanation failures  
- Add dark mode  

