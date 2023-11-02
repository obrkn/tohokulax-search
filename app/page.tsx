"use client";

// import data_2008 from "@/public/ameblo_tohokulax08/2008.json";
import Highlighter from "react-highlight-words";
import React, { useEffect } from "react";
import DefaultData from "@/app/data";

export interface ListItem {
  id: string;
  title: string;
  tags: string[];
  url: string;
  contents: string;
  article_datetime: string;
  created_datetime: string;
  secure_type: number;
}

const blogList = [
  {
    id: "ameblo#tohokulax08",
    title: "東北大学男子ラクロス部",
    description: "～東北大学男子ラクロス部員のブログ～",
    created_datetime: "2008年",
  },
  {
    id: "ameblo#humblers",
    title: "HUMBLERSのブログ",
    description: "～ハンブロ～",
    created_datetime: "2010年",
  },
];

export default function Sub() {
  const [query, setQuery] = React.useState("");
  const [rawData, setRawData] = React.useState<ListItem[]>(DefaultData);
  const [results, setResults] = React.useState<ListItem[]>(DefaultData);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentTag, setCurrentTag] = React.useState("ameblo#tohokulax08");

  React.useEffect(() => {
    setRawData(
      DefaultData.filter((item) => item.tags.some((tag) => tag === currentTag))
    );
    setResults(
      DefaultData.filter((item) => item.tags.some((tag) => tag === currentTag))
    );
  }, [currentTag]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    if (value.length === 0) {
      setResults(rawData);
      return;
    }

    setResults(
      rawData.filter(
        (item) => item.title.includes(value) || item.contents.includes(value)
      )
    );
  };

  return (
    <main className="container mx-auto px-4 my-12">
      <div className="text-right -mt-6 pb-4 text-xs text-gray-400">
        データ更新日: 2023年11月01日
      </div>
      <div className="relative flex items-center border-b border-violet-900 py-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
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
        <span
          onClick={() => setIsOpen(true)}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 cursor-pointer hover:scale-105"
        >
          {currentTag}
        </span>
      </div>
      <ul>
        {results.slice(0, 30).map((item) => (
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
              <div className="text-right text-gray-300 italic text-sm pt-1">
                {item.article_datetime.slice(0, 16)}
              </div>
            </div>
          </a>
        ))}
      </ul>
      {isOpen && (
        <div
          onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            setIsOpen(false);
          }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-4 rounded">
            <div className="text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="m10.707 10 4.147-4.146a.5.5 0 1 0 -.707-.708l-4.147 4.146-4.146-4.146a.5.5 0 0 0 -.708.708l4.146 4.146-4.146 4.147a.5.5 0 1 0 .708.707l4.146-4.146 4.147 4.146a.5.5 0 1 0 .707-.707z" />
                </svg>
              </button>
            </div>
            <div className="grid">
              <h3 className="mb-5 text-lg text-gray-700 font-bold text-center">
                ブログタイトル
              </h3>
              <ul className="grid w-full gap-6 md:grid-cols-3">
                {blogList.map((item) => (
                  <li key={item.id} className="relative">
                    <p className="absolute bottom-1 right-2 text-xs text-gray-400">
                      {item.id}
                    </p>
                    <input
                      type="radio"
                      id={item.id}
                      name="blogTag"
                      defaultChecked={currentTag === item.id}
                      className="hidden peer"
                      onChange={(e) => {
                        if (e.target.checked) setCurrentTag(item.id);
                      }}
                    />
                    <label
                      htmlFor={item.id}
                      className="inline-flex w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
                    >
                      <div className="text-center w-full">
                        <p className="text-bold">{item.title}</p>
                        <p className="text-sm">{item.description}</p>
                        <p className="text-xs">{item.created_datetime}</p>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid mt-12">
              <h3 className="mb-5 text-lg text-gray-700 font-bold text-center">
                サブタグ
              </h3>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
