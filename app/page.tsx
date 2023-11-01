"use client";

import React, { useState } from "react";
import Fuse, { IFuseOptions } from "fuse.js";
import data from "@/public/ameblo_tohokulax08/list.json";

interface ListItem {
  id: string;
  title: string;
  tags: string[];
  url: string;
  article_datetime: string;
  created_datetime: string;
  secure_type: number;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ListItem[]>(data);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    if (value.length === 0) {
      setResults(data);
      return;
    }

    const options: IFuseOptions<ListItem> = {
      includeScore: true,
      keys: ["title"],
    };

    const fuse = new Fuse(data, options);
    const result = fuse.search(value);
    const matches = result.map((item) => item.item);
    setResults(matches);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search"
      />
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            <h2>{item.title}</h2>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
