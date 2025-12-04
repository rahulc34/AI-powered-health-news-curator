import { Request, Response } from "express";
import { generateArticles } from "../services/openaiService";

export async function getArticles(req: Request, res: Response) {
  try {
    const count = Number(req.query.count) || 10;
    const articles = await generateArticles(count);
    console.log("got data....");
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create articles" });
  }
}
