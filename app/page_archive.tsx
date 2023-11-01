"use client";

import React, { useMemo, useState } from "react";
import Fuse, { IFuseOptions, FuseResultMatch } from "fuse.js";
import data from "@/public/ameblo_tohokulax08/list.json";
import data_2008 from "@/public/ameblo_tohokulax08/2008.json";
import moji from "moji";
import TinySegmenter from "tiny-segmenter";

const segmenter = new TinySegmenter();

function tokenize(text: string) {
  const query = moji(text)
    .convert("HK", "ZK")
    .convert("ZS", "HS")
    .convert("ZE", "HE")
    .toString()
    .trim();
  return segmenter
    .segment(query)
    .map((word: string) => {
      if (word !== " ") {
        return moji(word).convert("HG", "KK").toString().toLowerCase();
      }
    })
    .filter((v: string) => v);
}

function encode(text: string) {
  return moji(text)
    .convert("HK", "ZK")
    .convert("ZS", "HS")
    .convert("ZE", "HE")
    .convert("HG", "KK")
    .toString()
    .trim()
    .toLowerCase();
}

interface ListItem {
  id: string;
  title: string;
  search_title: string;
  tokenized_title: string;
  tags: string[];
  url: string;
  contents?: string;
  search_contents?: string;
  tokenized_contents?: string;
  article_datetime: string;
  created_datetime: string;
  secure_type: number;
}

const search_data: ListItem[] = data_2008.map((item) => {
  return {
    ...item,
    search_title: encode(item.title),
    tokenized_title: tokenize(item.title),
    search_contents: encode(item.contents),
    tokenized_contents: tokenize(item.contents),
  };
});

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ListItem[]>(search_data);
  const [matches, setMatches] = useState<
    (readonly FuseResultMatch[] | undefined)[]
  >([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    if (value.length === 0) {
      setResults(search_data);
      return;
    }

    const options: IFuseOptions<ListItem> = {
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      threshold: 0.3,
      keys: [
        "tags",
        "search_title",
        "tokenized_title",
        "search_contents",
        "tokenized_contents",
      ],
    };

    const fuse = new Fuse(search_data, options);
    console.log(encode(value));
    const result = fuse.search(encode(value));
    console.log(result);
    setMatches(result.map((item) => item.matches));
    const matches = result.map((item) => item.item);
    setResults(matches);
  };

  return (
    <main className="container mx-auto px-4 my-12">
      <div className="flex items-center border-b border-violet-900 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
              <div className="font-bold text-xl mb-2 text-violet-900">
                {item.title}
              </div>
              <HighlightText text={item.title} matches={matches} />
              <p className="text-gray-500 text-sm">{item.contents}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </ul>
    </main>
  );
}

function HighlightText({
  text,
  matches,
}: {
  text: string;
  matches: (readonly FuseResultMatch[] | undefined)[];
}) {
  let lastIndex = 0;
  const elements = [];

  matches.forEach((ranges, index) => {
    if (typeof ranges === "undefined") {
      return;
    }
    ranges
      .filter((range) => range.key === "search_title")
      .forEach((range, i) => {
        const before = text.slice(lastIndex, range.indices[0][0]);
        const highlight = text.slice(range.indices[0][0], range.indices[0][1]);

        elements.push(<span key={lastIndex}>{before}</span>);
        elements.push(
          <span
            key={`${index}_${i}_${range.indices[0][0]}`}
            className="bg-yellow-200"
          >
            {highlight}
          </span>
        );

        lastIndex = range.indices[0][1];
      });
  });

  elements.push(<span key={`${lastIndex}_aaa`}>{text.slice(lastIndex)}</span>);

  return <p>{elements}</p>;
}
