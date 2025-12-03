import { Article } from "../types/Article";

export default function ArticleCard({
  article,
  onExplain,
}: {
  article: Article;
  onExplain: () => void;
}) {
  return (
    <div className="card">
      <h3>{article.title}</h3>
      <p>{article.tl_dr}</p>

      <ul>
        {article.takeaways.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <button onClick={onExplain}>Explain</button>
    </div>
  );
}
