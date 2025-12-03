import { useEffect, useState } from "react";
import { useArticles } from "../hooks/useArticles";
import ArticleCard from "../components/ArticleCard";
import ExplainModal from "../components/ExplainModal";

export default function FeedScreen() {
  const {
    articles,
    loading,
    loadingMore,
    refreshing,
    error,
    loadInitial,
    loadMore,
    refresh,
  } = useArticles();

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  useEffect(() => {
    loadInitial();
  }, []);

  const selectedArticle = articles.find(a => a.id === selectedArticleId);

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Health News Feed
        </h1>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          onClick={refresh}
          disabled={refreshing || loading}
        >
          {refreshing ? "Refreshing..." : "↻ Refresh"}
        </button>
      </header>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <p className="text-gray-600 text-center text-lg">Loading articles...</p>
      )}

      {/* Article list */}
      <div className="space-y-4">
        {articles.length > 0 ? (
          articles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onExplain={() => setSelectedArticleId(article.id)}
            />
          ))
        ) : (
          !loading && (
            <p className="text-gray-500 text-center">No articles available.</p>
          )
        )}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <button
          className="mt-4 px-6 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
          onClick={loadMore}
          disabled={loadingMore || loading}
        >
          {loadingMore ? "Loading more..." : "Load More"}
        </button>
      </div>

      {/* Explanation Modal */}
      <ExplainModal
        isOpen={selectedArticleId !== null}
        explanation={selectedArticle?.fullExplanation}
        onClose={() => setSelectedArticleId(null)}
      />
    </div>
  );
}
