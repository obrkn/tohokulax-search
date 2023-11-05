"use server";

import Main from "@/app/main";
import { cookies } from "next/headers";
import { themes, Theme } from "./library";
import Script from "next/script";

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
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-NBPLB36R8J" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-NBPLB36R8J');
        `}
      </Script>
      <Main
        initialTag={initialTag}
        initialTheme={initialTheme}
        isFirstVisit={isFirstVisit}
      />
    </>
  );
}
