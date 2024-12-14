"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/prismicio";

const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const client = createClient();
      const data = await client.getAllByType("article", {
        fetchLinks: [
          "taxonomy_news_article_category.uid",
          "taxonomy_news_article_category.name",
        ],
      });
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <ArticlesContext.Provider value={articles}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
