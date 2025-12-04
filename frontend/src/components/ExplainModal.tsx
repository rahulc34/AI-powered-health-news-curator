import { useEffect } from "react";
import { useArticles } from "../hooks/useArticles";

export default function ExplainModal({
  isOpen,
  articleId,
  onClose
}: {
  isOpen: boolean;
  articleId: string | null;
  onClose: () => void;
}) {

  const {
    articles,
    explain,
    explainingId,
    error,
  } = useArticles();

  const article = articleId ? articles.find(a => a.id === articleId) : null;

  useEffect(() => {
    if (isOpen && article && !article.fullExplanation) {
      explain(article.id);
    }
  }, [isOpen, articleId]);

  if (!isOpen || !articleId) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full p-6 rounded-xl shadow-xl">

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Friendly Explanation
        </h2>

        {/* Loading */}
        {!article?.fullExplanation && explainingId === articleId && (
          <p className="text-gray-500">Loading explanation...</p>
        )}

        {/* Error */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Explanation */}
        {article?.fullExplanation && (
          <p className="text-gray-700 whitespace-pre-wrap">
            {article.fullExplanation}
          </p>
        )}

        <button
          className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
