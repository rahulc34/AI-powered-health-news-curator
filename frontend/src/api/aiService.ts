import axios from "axios";
import { Article } from "../types/Article";

const API_URL = "http://localhost:3000"; // Your backend

export async function fetchArticles(count: number = 10): Promise<Article[]> {
  const response = await axios.get(`${API_URL}/articles?count=${count}`);
  return response.data;
}

export async function explainArticle(article: Article): Promise<string> {
  const response = await axios.post(`${API_URL}/explain`, { article });
  return response.data.explanation;
}
