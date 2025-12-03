import { useEffect, useState } from "react";
import { useArticles } from "../hooks/useArticles";
import ArticleCard from "../components/ArticleCard";
import ExplainModal from "../components/ExplainModal";

export default function FeedScreen() {
  const { articles, loading, loadInitial, loadMore, refresh, explain } =
    useArticles();

  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  useEffect(() => {
    loadInitial();
  }, []);

  return (
    <div>
      <button onClick={refresh}>↻ Refresh</button>

      {loading && <p>Loading...</p>}

      {articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          onExplain={() => setSelectedArticle(article.id)}
        />
      ))}

      <button onClick={loadMore}>Load More</button>

      <ExplainModal
        isOpen={selectedArticle !== null}
        explanation={
          articles.find(a => a.id === selectedArticle)?.fullExplanation
        }
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
