import { useContext, useState } from "react";
import { ArticleContext } from "../context/ArticleContext";
import { fetchArticles, explainArticle } from "../api/aiService";

export function useArticles() {
  const { articles, setArticles } = useContext(ArticleContext);
  const [loading, setLoading] = useState(false);

  async function loadInitial() {
    setLoading(true);
    const data = await fetchArticles(10);
    setArticles(data);
    setLoading(false);
  }

  async function loadMore() {
    const more = await fetchArticles(10);
    setArticles([...articles, ...more]);
  }

  async function refresh() {
    const fresh = await fetchArticles(10);
    setArticles(fresh);
  }

  async function explain(id: string) {
    const article = articles.find(a => a.id === id);
    if (!article) return;

    const explanation = await explainArticle(article);

    setArticles(
      articles.map(a =>
        a.id === id ? { ...a, fullExplanation: explanation } : a
      )
    );
  }

  return { articles, loading, loadInitial, loadMore, refresh, explain };
}
