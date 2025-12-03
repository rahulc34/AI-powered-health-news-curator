import { useEffect } from "react";
import { useArticles } from "../hooks/useArticles";
import { Article } from "../types/Article";

export default function ExplanationScreen({
  article,
  onBack,
}: {
  article: Article;
  onBack: () => void;
}) {
  const { explain } = useArticles();

  // Auto-fetch explanation on screen load (if missing)
  useEffect(() => {
    if (!article.fullExplanation) {
      explain(article.id);
    }
  }, [article.fullExplanation, article.id, explain]);

  return (
    <div className="p-4">
      <button
        className="mb-4 px-3 py-1 bg-gray-200 rounded"
        onClick={onBack}
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>

      {/* Summary */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold">Summary</h2>
        <p className="text-gray-700">{article.tl_dr}</p>

        <ul className="list-disc ml-5 mt-2 text-gray-600">
          {article.takeaways.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>

      {/* Explanation */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Friendly Explanation</h2>

        {!article.fullExplanation ? (
          <p className="text-gray-500 mt-2">Loading explanation...</p>
        ) : (
          <p className="text-gray-700 mt-2 whitespace-pre-wrap">
            {article.fullExplanation}
          </p>
        )}
      </section>
    </div>
  );
}
