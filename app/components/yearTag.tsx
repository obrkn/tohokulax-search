import { Theme, colorList } from "../library";
import { Transition, Listbox } from "@headlessui/react";
import { Fragment } from "react";

export default function YearTag({
  year,
  yearFunc,
  currentTheme,
  yearOptions,
}: {
  year: number;
  yearFunc: (val: number) => void;
  currentTheme: Theme;
  yearOptions: number[];
}) {
  return (
    <Listbox value={year} onChange={yearFunc}>
      <div className="relative inline">
        <Listbox.Button className="bg-gray-200 rounded-full px-3 py-1 w-100 text-xs font-semibold text-gray-500 cursor-pointer hover:scale-110">
          {year === 0 ? "すべて" : `${year}年`}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute right-0 mt-1 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {yearOptions.map((year, yearIdx) => (
              <Listbox.Option
                key={yearIdx}
                className={({ active }) =>
                  `cursor-default select-none py-2 px-4 ${
                    active
                      ? `${colorList.bg25[currentTheme.color]} ${
                          colorList.text[currentTheme.color]
                        }`
                      : "text-gray-600"
                  }`
                }
                value={year}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {year === 0 ? "すべて" : `${year}年`}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
