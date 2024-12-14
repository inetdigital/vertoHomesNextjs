"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/prismicio";

const TaxonomyArticlesContext = createContext();

export const TaxonomyArticlesProvider = ({ children }) => {
  const [taxonomyArticles, setTaxonomyArticles] = useState([]);

  useEffect(() => {
    const fetchTaxonomyArticles = async () => {
      const client = createClient();
      const data = await client.getAllByType("taxonomy_news_article_category");
      setTaxonomyArticles(data);
    };

    fetchTaxonomyArticles();
  }, []);

  return (
    <TaxonomyArticlesContext.Provider value={taxonomyArticles}>
      {children}
    </TaxonomyArticlesContext.Provider>
  );
};

export const useTaxonomyArticles = () => useContext(TaxonomyArticlesContext);
