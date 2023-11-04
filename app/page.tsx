"use server";

import Main from "@/app/main";
import { cookies } from "next/headers";
import { themes, Theme } from "./library";

export default async function Home() {
  const cookieStore = cookies();
  const initialTag =
    cookieStore.get("currentTag")?.value || "ameblo#tohokulax08";
  const initialThemeId =
    cookieStore.get("currentThemeId")?.value || "ameblo#tohokulax08";
  const initialTheme: Theme =
    themes.find((theme) => theme.id === initialThemeId) || themes[0];

  const isFirstVisit = cookieStore.get("currentTag") === undefined;

  return (
    <Main
      initialTag={initialTag}
      initialTheme={initialTheme}
      isFirstVisit={isFirstVisit}
    />
  );
}
