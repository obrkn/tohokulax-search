"use client";

// import data_2008 from "@/public/ameblo_tohokulax08/2008.json";
import Highlighter from "react-highlight-words";
import React, { useEffect } from "react";
import DefaultData from "@/app/data";
import Image from "next/image";
import Modal from "react-modal";

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

interface Theme {
  id: string;
  title: string;
  description: string;
  period: string;
  color: Color;
  icon: Icon;
}

enum Color {
  Violet900,
  Blue700,
  Amber700,
  Pink700,
  Purple600,
  Cyan600,
  Green800,
  Red500,
}
enum Icon {
  Dragon,
  Humbler,
}

const Themes = [
  {
    id: "ameblo#tohokulax08",
    title: "東北大学男子ラクロス部",
    description: "～東北大学男子ラクロス部員のブログ～",
    period: "2008年 - 更新中",
    color: Color.Violet900,
    icon: Icon.Dragon,
  },
  {
    id: "ameblo#humblers",
    title: "HUMBLERSのブログ",
    description: "～ハンブロ～",
    period: "2010年 - 更新中",
    color: Color.Blue700,
    icon: Icon.Humbler,
  },
  {
    id: "ameblo#tohokulaxmgs16",
    title: "東北大学男子ラクロス部チームスタッフブログ",
    description: "東北大学男子ラクロス部チームスタッフのブログです。",
    period: "2010年 - 2019年",
    color: Color.Purple600,
    icon: Icon.Dragon,
  },
  {
    id: "livedoor#jolax",
    title: "へこたれへん！！！！",
    description: "東北大女子ラクロス部★部内日記",
    period: "2006年 - 2017年",
    color: Color.Pink700,
    icon: Icon.Humbler,
  },
  {
    id: "binwan-tohoku#jugem",
    title: "ウィンブレではなく、ラクジャン",
    description:
      "更新数のやばい、東北大学学友会男子ラクロス部マネージャーのブログ",
    period: "2008年 - 2010年",
    color: Color.Amber700,
    icon: Icon.Dragon,
  },
  {
    id: "ameblo#jolax-tohoku",
    title: "まめおかき",
    description: "～東北大女子ラクロス部の成長の記録～",
    period: "2009年 - 2010年",
    color: Color.Cyan600,
    icon: Icon.Humbler,
  },
  {
    id: "ameblo#passer-hiro53",
    title: "ケニアより愛を込めて",
    description: "日本が恋しいです。冗談だけど。",
    period: "2007年 - 2011年",
    color: Color.Green800,
    icon: Icon.Dragon,
  },
  {
    id: "ameblo#tohokulaxmgs",
    title: "ウィンブレではなく、ラクジャンのポケット",
    description: "ジュゲムの限界にアメブロが挑みます。",
    period: "2009年",
    color: Color.Red500,
    icon: Icon.Dragon,
  },
];

export default function Home() {
  const [query, setQuery] = React.useState("");
  const [rawData, setRawData] = React.useState<ListItem[]>(DefaultData);
  const [results, setResults] = React.useState<ListItem[]>(DefaultData);
  const [isOpen, setIsOpen] = React.useState(true);
  const [currentTag, setCurrentTag] = React.useState(
    localStorage.getItem("currentTag") || "ameblo#tohokulax08"
  );
  const [isLogo, setIsLogo] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState<Theme>(() => {
    const themeId = localStorage.getItem("currentThemeId");
    if (themeId) {
      return Themes.find((item) => item.id === themeId) || Themes[0];
    }
    return Themes[0];
  });

  React.useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  React.useEffect(() => {
    setRawData(
      DefaultData.filter((item) => item.tags.some((tag) => tag === currentTag))
    );
    setResults(
      DefaultData.filter((item) => item.tags.some((tag) => tag === currentTag))
    );
    setCurrentTheme(
      (prev) => Themes.find((item) => item.id === currentTag) || prev
    );
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    localStorage.setItem("currentTag", currentTag);
  }, [currentTag]);

  React.useEffect(() => {
    localStorage.setItem("currentThemeId", currentTheme.id);
  }, [currentTheme]);

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

  return (
    <main className="container mx-auto px-4 my-12">
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
      <ul>
        {results.slice(0, 30).map((item) => (
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
                unhighlightClassName={query.length === 0 ? "line-clamp-5" : ""}
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
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
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
          {Themes.map((item) => (
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
