import FeedScreen from "./screens/FeedScreen";
import { ArticleProvider } from "./context/ArticleContext";

export default function App() {
  return (
    <ArticleProvider>
      <FeedScreen />
    </ArticleProvider>
  );
}
