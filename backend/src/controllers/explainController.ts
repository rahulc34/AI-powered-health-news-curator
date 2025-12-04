import { Request, Response } from "express";
import { explainArticle } from "../services/openaiService";

export async function getExplanation(req: Request, res: Response) {
  try {
    const article = req.body.article;
    const explanation = await explainArticle(article);

    res.json({ explanation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
}
