"use client";

// import data_2008 from "@/public/ameblo_tohokulax08/2008.json";
import Highlighter from "react-highlight-words";
import React from "react";
import DefaultData from "./data";
import Image from "next/image";
import Modal from "react-modal";
import Cookie from "js-cookie";
import { themes, Theme, ListItem, ThemeId } from "./library";

export default function Main({
  initialTag,
  initialTheme,
  isFirstVisit,
}: {
  initialTag: string;
  initialTheme: Theme;
  isFirstVisit: boolean;
}) {
  const [query, setQuery] = React.useState("");
  const [rawData, setRawData] = React.useState<ListItem[]>(DefaultData);
  const [results, setResults] = React.useState<ListItem[]>(DefaultData);
  const [isOpen, setIsOpen] = React.useState(isFirstVisit);
  const [currentTag, setCurrentTag] = React.useState(initialTag);
  const [isLogo, setIsLogo] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState<Theme>(initialTheme);
  const [numOfDisplay, setNumOfDisplay] = React.useState(30);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  React.useEffect(() => {
    setLoading(true);
    setRawData(
      DefaultData.filter((item) =>
        item.tags.some((tag: string) => tag === currentTag)
      )
    );
    setResults(
      DefaultData.filter((item) =>
        item.tags.some((tag: string) => tag === currentTag)
      )
    );
    setQuery("");
    const theme = themes.find((item) => item.id === currentTag);
    setCurrentTheme((prev) => theme || prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
    Cookie.set("currentTag", currentTag);
    if (theme?.id) Cookie.set("currentThemeId", theme.id);
    setLoading(false);
  }, [currentTag]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsLogo(true);
      } else {
        setIsLogo(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300
      ) {
        setNumOfDisplay((prev) => prev + 30);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    if (value.length === 0) {
      setResults(rawData);
      return;
    }
    setNumOfDisplay(30);

    setResults(
      rawData.filter(
        (item) => item.title.includes(value) || item.contents.includes(value)
      )
    );
  };

  return (
    <main className="container mx-auto px-4 my-12 min-h-screen">
      <div className="text-right -mt-6 pb-4 text-xs text-gray-400">
        データ更新日: 2023年11月01日
      </div>
      <div
        className={`relative flex items-center border-b-2 py-2 ${
          currentTheme.color === 0
            ? "border-violet-900"
            : currentTheme.color === 1
            ? "border-blue-700"
            : currentTheme.color === 2
            ? "border-amber-700"
            : currentTheme.color === 3
            ? `border-pink-700`
            : currentTheme.color === 4
            ? `border-purple-600`
            : currentTheme.color === 5
            ? `border-cyan-600`
            : currentTheme.color === 6
            ? `border-green-800`
            : `border-red-500`
        }`}
      >
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
          className="appearance-none bg-transparent border-none grow text-gray-700 mr-3 py-1 pl-10 leading-tight focus:outline-none"
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search"
          autoFocus
        />
        <span
          onClick={() => setIsOpen(true)}
          className="hidden md:inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 cursor-pointer hover:scale-105"
        >
          {currentTag}
        </span>
      </div>
      <div className="text-right mr-2 mt-2">
        <span className="text-gray-400 text-sm">
          {results.length} / {rawData.length}
        </span>
        <span
          onClick={() => setIsOpen(true)}
          className="md:hidden bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 cursor-pointer hover:scale-105 ml-2"
        >
          {currentTag}
        </span>
      </div>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Image
            className="motion-safe:animate-ping rounded-full"
            src={
              currentTheme.icon === 0
                ? "/dragon_loading.png"
                : "/humblers_loading.jpeg"
            }
            width={currentTheme.icon === 0 ? 100 : 80}
            height={currentTheme.icon === 0 ? 100 : 80}
            alt="loading"
          />
        </div>
      ) : (
        <ul>
          {results.slice(0, numOfDisplay).map((item) => (
            <div
              key={item.id}
              className={`rounded overflow-hidden shadow hover:shadow-lg hover:scale-105 mt-8 hover:border-2 ${
                currentTheme.color === 0
                  ? "hover:border-violet-900"
                  : currentTheme.color === 1
                  ? "hover:border-blue-700"
                  : currentTheme.color === 2
                  ? "hover:border-amber-700"
                  : currentTheme.color === 3
                  ? "hover:border-pink-700"
                  : currentTheme.color === 4
                  ? "hover:border-purple-600"
                  : currentTheme.color === 5
                  ? "hover:border-cyan-600"
                  : currentTheme.color === 6
                  ? "hover:border-green-800"
                  : "hover:border-red-500"
              }`}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-6 py-4"
              >
                <Highlighter
                  className={`block font-bold text-base mb-2 ${
                    currentTheme.color === 0
                      ? "text-violet-900"
                      : currentTheme.color === 1
                      ? "text-blue-700"
                      : currentTheme.color === 2
                      ? "text-amber-700"
                      : currentTheme.color === 3
                      ? "text-pink-700"
                      : currentTheme.color === 4
                      ? "text-purple-600"
                      : currentTheme.color === 5
                      ? "text-cyan-600"
                      : currentTheme.color === 6
                      ? "text-green-800"
                      : "text-red-500"
                  }`}
                  highlightClassName="bg-yellow-200"
                  searchWords={[query]}
                  autoEscape={true}
                  textToHighlight={item.title}
                />
                <Highlighter
                  className="block text-gray-500 text-sm"
                  unhighlightClassName={
                    query.length === 0 ? "line-clamp-5" : ""
                  }
                  highlightClassName="bg-yellow-200"
                  searchWords={[query]}
                  autoEscape={true}
                  textToHighlight={item.contents}
                />
              </a>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-2 px-6 pb-4">
                <div className="">
                  {item.tags
                    .filter((tag) => tag !== "ブログ")
                    .map((tag, index) => (
                      <span
                        key={index}
                        onClick={() => {
                          setCurrentTag(tag);
                        }}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 mr-2 cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <div className="text-right text-gray-300 italic text-sm pt-1">
                  {item.article_datetime.slice(0, 16)}
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto"
        className="bg-white p-4 m-4 rounded outline-none max-h-full overflow-y-auto"
      >
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
        <ul className="grid w-full gap-3 md:grid-cols-3 mt-5">
          {themes.map((item) => (
            <li key={item.id} className="relative h-auto">
              <p className="absolute bottom-1 right-2 text-xs text-gray-400">
                {item.id}
              </p>
              <input
                type="radio"
                id={item.id}
                name="blogTag"
                defaultChecked={currentTheme.id === item.id}
                className="hidden peer"
                onChange={(e) => {
                  if (e.target.checked) {
                    setCurrentTag(item.id);
                  }
                }}
              />
              <label
                htmlFor={item.id}
                className={`inline-flex w-full h-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50 ${
                  item.color === 0
                    ? "peer-checked:border-violet-900"
                    : item.color === 1
                    ? "peer-checked:border-blue-700"
                    : item.color === 2
                    ? "peer-checked:border-amber-700"
                    : item.color === 3
                    ? "peer-checked:border-pink-700"
                    : item.color === 4
                    ? "peer-checked:border-purple-600"
                    : item.color === 5
                    ? "peer-checked:border-cyan-600"
                    : item.color === 6
                    ? "peer-checked:border-green-800"
                    : "peer-checked:border-red-500"
                }`}
              >
                <div className="text-center w-full">
                  <p className="text-bold text-xs md:text-base">{item.title}</p>
                  <p className="text-xs md:text-sm">{item.description}</p>
                  <p className="text-xs">{item.period}</p>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </Modal>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`fixed flex justify-center items-center bottom-2 right-4 w-16 h-16 rounded-full shadow-lg hover:-rotate-12 hover:scale-150 hover:-translate-x-6 hover:-translate-y-6 ${
          currentTheme.color === 0
            ? "bg-violet-900"
            : currentTheme.color === 1
            ? "bg-blue-700"
            : currentTheme.color === 2
            ? "bg-amber-700"
            : currentTheme.color === 3
            ? "bg-pink-700"
            : currentTheme.color === 4
            ? "bg-purple-600"
            : currentTheme.color === 5
            ? "bg-cyan-600"
            : currentTheme.color === 6
            ? "bg-green-800"
            : "bg-red-500"
        } ${
          isLogo ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-500`}
      >
        <Image
          className="-m-2 max-w-none"
          src={currentTheme.icon === 0 ? "/dragon.png" : "/humblers.png"}
          width={100}
          height={100}
          alt="aa"
        />
      </button>
    </main>
  );
}
