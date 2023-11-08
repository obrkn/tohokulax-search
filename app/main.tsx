"use client";

import Highlighter from "react-highlight-words";
import React, { Fragment } from "react";
import DefaultData from "./data";
import Image from "next/image";
import Cookie from "js-cookie";
import { themes, Theme, ListItem, colorList } from "./library";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import YearTag from "./components/yearTag";

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
  const [ascOn, setAscOn] = React.useState(false);
  const [year, setYear] = React.useState<number>(0);
  const [yearOptions, setYearOptions] = React.useState<number[]>([0]);

  React.useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setNumOfDisplay(30);
    const tagFilteredResults = DefaultData.filter((item) =>
      item.tags.some((tag: string) => tag === currentTag)
    );
    setYearOptions(() => {
      const set: Set<number> = new Set();
      tagFilteredResults.forEach((item) =>
        set.add(Number(item.article_datetime.slice(0, 4)))
      );

      return [0, ...Array.from(set)];
    });
    let yearFilteredResults = tagFilteredResults;
    if (year !== 0) {
      yearFilteredResults = yearFilteredResults.filter(
        (item) => Number(item.article_datetime.slice(0, 4)) === year
      );
    }
    setRawData(yearFilteredResults);
    let queryFilteredResults = yearFilteredResults;
    if (ascOn) {
      queryFilteredResults = queryFilteredResults.reverse();
    }
    if (query.length > 0) {
      queryFilteredResults = queryFilteredResults.filter(
        (item) => item.title.includes(query) || item.contents.includes(query)
      );
    }
    setResults(queryFilteredResults);
    const theme = themes.find((item) => item.id === currentTag);
    setCurrentTheme((prev) => theme || prev);
    Cookie.set("currentTag", currentTag, { expires: 365 });
    if (theme?.id) Cookie.set("currentThemeId", theme.id, { expires: 365 });
    setLoading(false);
  }, [currentTag, ascOn, query, year]);

  React.useEffect(() => {
    if (!yearOptions.includes(year)) {
      setYear(0);
    }
  }, [yearOptions, year]);

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
  };

  return (
    <main className="container mx-auto px-4 my-12 min-h-screen">
      <div className="text-right -mt-6 pb-4 text-xs text-gray-400">
        データ更新日: 2023年11月01日
      </div>
      <div
        className={`relative flex items-center border-b-2 py-2 ${
          colorList.border[currentTheme.color]
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
        <span className="hidden md:inline">
          <span
            onClick={() => setIsOpen(true)}
            className="bg-gray-200 rounded-full px-3 py-1 mr-3 text-xs font-semibold text-gray-500 cursor-pointer hover:scale-110"
          >
            {currentTag}
          </span>
          <span
            onClick={() => setAscOn((prev) => !prev)}
            className="bg-gray-200 rounded-full px-3 py-1 mr-3 text-xs font-semibold text-gray-500 cursor-pointer hover:scale-110"
          >
            {ascOn ? "古い順" : "新しい順"}
          </span>
          <YearTag
            year={year}
            yearFunc={(val) => setYear(val)}
            currentTheme={currentTheme}
            yearOptions={yearOptions}
          />
        </span>
        <span className="inline md:hidden text-gray-400 text-sm mr-2">
          {results.length} / {rawData.length}
        </span>
      </div>
      <div className="text-right mt-2 -ml-12">
        <span className="inline md:hidden">
          <span
            onClick={() => setIsOpen(true)}
            className="bg-gray-200 rounded-full px-3 py-1 mr-3 text-xs font-semibold text-gray-500 cursor-pointer hover:scale-110"
          >
            {currentTag}
          </span>
          <span
            onClick={() => setAscOn((prev) => !prev)}
            className="bg-gray-200 rounded-full px-3 py-1 mr-3 text-xs font-semibold text-gray-500 cursor-pointer hover:scale-110"
          >
            {ascOn ? "古い順" : "新しい順"}
          </span>
          <YearTag
            year={year}
            yearFunc={(val) => setYear(val)}
            currentTheme={currentTheme}
            yearOptions={yearOptions}
          />
        </span>
        <span className="hidden md:inline text-gray-400 text-sm mr-2">
          {results.length} / {rawData.length}
        </span>
      </div>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Image
            className="motion-safe:animate-ping rounded-full"
            src={
              currentTheme.icon === 0
                ? "/dragon_loading.jpg"
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
                colorList.hoverBorder[currentTheme.color]
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
                    colorList.text[currentTheme.color]
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="w-full text-right">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      <svg
                        className="w-10 h-10 fill-current"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="m10.707 10 4.147-4.146a.5.5 0 1 0 -.707-.708l-4.147 4.146-4.146-4.146a.5.5 0 0 0 -.708.708l4.146 4.146-4.146 4.147a.5.5 0 1 0 .708.707l4.146-4.146 4.147 4.146a.5.5 0 1 0 .707-.707z" />
                      </svg>
                    </button>
                  </div>
                  <RadioGroup
                    value={currentTheme}
                    onChange={(value) => setCurrentTag(value.id)}
                  >
                    <RadioGroup.Label className="sr-only">
                      blogTag
                    </RadioGroup.Label>
                    <div className="grid w-full gap-3 md:grid-cols-3 mt-5">
                      {themes.map((theme) => (
                        <RadioGroup.Option
                          key={theme.id}
                          value={theme}
                          className={({ active, checked }) =>
                            `${
                              active
                                ? `ring-2 ring-white/60 ring-offset-2 ${
                                    colorList.ringOffset[theme.color]
                                  }`
                                : ""
                            }
                                ${
                                  checked
                                    ? `${
                                        colorList.bg75[theme.color]
                                      } text-white`
                                    : "bg-white"
                                }
                                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-medium  ${
                                        checked ? "text-white" : "text-gray-900"
                                      }`}
                                    >
                                      {theme.title}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className={`inline text-xs ${
                                        checked
                                          ? "text-sky-100"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {theme.description}
                                      <br />
                                      {theme.period}
                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                {checked && (
                                  <div className="shrink-0 text-white">
                                    <svg
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      className="h-6 w-6"
                                    >
                                      <circle
                                        cx={12}
                                        cy={12}
                                        r={12}
                                        fill="#fff"
                                        opacity="0.2"
                                      />
                                      <path
                                        d="M7 13l3 3 7-7"
                                        stroke="#fff"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`fixed flex justify-center items-center bottom-2 right-4 w-16 h-16 rounded-full shadow-lg hover:-rotate-12 hover:scale-150 hover:-translate-x-6 hover:-translate-y-6 ${
          colorList.bg[currentTheme.color]
        } ${
          isLogo ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-500`}
      >
        <Image
          className="-m-2 max-w-none"
          src={currentTheme.icon === 0 ? "/dragon.png" : "/humblers.png"}
          width={100}
          height={100}
          alt="logo"
        />
      </button>
    </main>
  );
}
