"use client";

// import data_2008 from "@/public/ameblo_tohokulax08/2008.json";
import Highlighter from "react-highlight-words";
import React, { useEffect } from "react";

interface ListItem {
  id: string;
  title: string;
  tags: string[];
  url: string;
  contents: string;
  article_datetime: string;
  created_datetime: string;
  secure_type: number;
}

export default function Sub() {
  const [query, setQuery] = React.useState("");
  const [rawData, setRawData] = React.useState<ListItem[]>([]);
  const [results, setResults] = React.useState<ListItem[]>([]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    if (value.length === 0) {
      setResults(rawData);
      return;
    }

    console.log(value);
    setResults(
      rawData.filter(
        (item) =>
          item.title.includes(value) ||
          item.contents.includes(value) ||
          item.tags.some((tag) => tag.includes(value))
      )
    );
  };
  useEffect(() => {
    async function fetch_data() {
      const fetch_data = await fetch("/ameblo_tohokulax08/2008.json");
      const json = await fetch_data.json();
      setRawData(json);
      setResults(json);
    }
    fetch_data();
  }, []);

  return (
    <main className="container mx-auto px-4 my-12">
      <div className="relative flex items-center border-b border-violet-900 py-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 pl-10 pr-2 leading-tight focus:outline-none"
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search"
          autoFocus
        />
      </div>
      <ul>
        {results.map((item) => (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            key={item.id}
            className="block rounded overflow-hidden shadow hover:shadow-lg hover:scale-105 mt-8"
          >
            <div className="px-6 py-4">
              <Highlighter
                className="block font-bold text-xl mb-2 text-violet-900"
                highlightClassName="bg-yellow-200"
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={item.title}
              />
              <Highlighter
                className="block text-gray-500 text-sm"
                highlightClassName="bg-yellow-200"
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={item.contents}
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2 px-6 pb-4">
              <div className="">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-right text-gray-300 italic text-sm">
                {item.article_datetime.slice(0, 16)}
              </div>
            </div>
          </a>
        ))}
      </ul>
    </main>
  );
}
