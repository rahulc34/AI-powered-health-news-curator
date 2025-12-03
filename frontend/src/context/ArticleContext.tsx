import { createContext, useState, ReactNode } from "react";
import { Article } from "../types/Article";

interface ArticleContextProps {
  articles: Article[];
  setArticles: (a: Article[]) => void;
}

export const ArticleContext = createContext<ArticleContextProps>({
  articles: [],
  setArticles: () => {},
});

export function ArticleProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);

  return (
    <ArticleContext.Provider value={{ articles, setArticles }}>
      {children}
    </ArticleContext.Provider>
  );
}
