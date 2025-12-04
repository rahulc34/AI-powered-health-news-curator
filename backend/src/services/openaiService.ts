import OpenAI from "openai";
import { Article } from "../types/Article";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateArticles(count: number): Promise<Article[]> {
  const prompt = `
  Generate ${count} health news summaries as JSON.
  Format:
  [
    {
      "id": "unique-id",
      "title": "",
      "tl_dr": "",
      "takeaways": ["", "", ""]
    }
  ]
  `;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  const text = response.output_text;

  return JSON.parse(text);
}

export async function explainArticle(article: Article): Promise<string> {
  const prompt = `
  Rewrite this article in simple, friendly language:

  Title: ${article.title}
  TLDR: ${article.tl_dr}
  Key Takeaways:
  - ${article.takeaways.join("\n- ")}

  Output only the rewritten explanation.
  `;

  console.log(prompt);

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  return response.output_text;
}
