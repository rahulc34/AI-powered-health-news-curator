import { Article } from "../types/Article";

export default function ArticleCard({
  article,
  onExplain,
}: {
  article: Article;
  onExplain: () => void;
}) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {article.title}
      </h3>

      <p className="text-gray-600 mb-3">{article.tl_dr}</p>

      <ul className="list-disc ml-6 text-gray-700 space-y-1">
        {article.takeaways.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        onClick={onExplain}
      >
        Explain
      </button>
    </div>
  );
}
