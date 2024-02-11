import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=8966cfb813eb458d9a3b432600a79451"
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-32 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {article.title}
            </h2>
            <p className="text-gray-600 text-sm">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-2 inline-block"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
