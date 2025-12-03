import { useContext, useState } from "react";
import { ArticleContext } from "../context/ArticleContext";
import { fetchArticles, explainArticle } from "../api/aiService";
import { Article } from "../types/Article";

export function useArticles() {
  const { articles, setArticles } = useContext(ArticleContext);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadInitial() {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchArticles(10);

      if (!data || data.length === 0) {
        setError("No articles returned from server.");
      }

      setArticles(data || []);
    } catch (err: any) {
      setError("Failed to load articles. Please try again.");
      console.error("loadInitial error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    setLoadingMore(true);
    setError(null);

    try {
      const more = await fetchArticles(10);

      if (!more || more.length === 0) {
        setError("No additional articles returned.");
        return;
      }

      setArticles([...articles, ...more]);
    } catch (err) {
      setError("Failed to load more articles.");
      console.error("loadMore error:", err);
    } finally {
      setLoadingMore(false);
    }
  }
  
  async function refresh() {
    setRefreshing(true);
    setError(null);

    try {
      const fresh = await fetchArticles(10);

      if (!fresh || fresh.length === 0) {
        setError("Unable to refresh articles.");
      }

      setArticles(fresh || []);
    } catch (err) {
      setError("Refresh failed.");
      console.error("refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  }

  async function explain(id: string) {
    const article = articles.find((a) => a.id === id);
    if (!article) {
      setError("Article not found.");
      return;
    }

    try {
      const explanation = await explainArticle(article);

      if (!explanation) {
        setError("Failed to generate explanation.");
        return;
      }

      setArticles(
        articles.map((a) =>
          a.id === id ? { ...a, fullExplanation: explanation } : a
        )
      );
    } catch (err) {
      setError("Error generating explanation.");
      console.error("explain error:", err);
    }
  }

  return {
    articles,
    loading,
    loadingMore,
    refreshing,
    error,
    loadInitial,
    loadMore,
    refresh,
    explain,
  };
}
