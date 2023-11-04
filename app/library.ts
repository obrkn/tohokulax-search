import { type } from "os";

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

export interface Theme {
  id: string;
  title: string;
  description: string;
  period: string;
  color: Color;
  icon: Icon;
}

export enum Color {
  Violet900,
  Blue700,
  Amber700,
  Pink700,
  Purple600,
  Cyan600,
  Green800,
  Red500,
}
export enum Icon {
  Dragon,
  Humbler,
}

export type ThemeId =
  | "ameblo#tohokulax08"
  | "ameblo#humblers"
  | "livedoor#jolax"
  | "ameblo#tohokulaxmgs16"
  | "ameblo#passer-hiro53"
  | "binwan-tohoku#jugem"
  | "ameblo#jolax-tohoku"
  | "ameblo#tohokulaxmgs";

export const themes: {
  id: ThemeId;
  title: string;
  description: string;
  period: string;
  color: Color;
  icon: Icon;
}[] = [
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
    id: "livedoor#jolax",
    title: "へこたれへん！！！！",
    description: "東北大女子ラクロス部★部内日記",
    period: "2006年 - 2017年",
    color: Color.Pink700,
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
    id: "ameblo#passer-hiro53",
    title: "ケニアより愛を込めて",
    description: "日本が恋しいです。冗談だけど。",
    period: "2007年 - 2011年",
    color: Color.Green800,
    icon: Icon.Dragon,
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
    id: "ameblo#tohokulaxmgs",
    title: "ウィンブレではなく、ラクジャンのポケット",
    description: "ジュゲムの限界にアメブロが挑みます。",
    period: "2009年",
    color: Color.Red500,
    icon: Icon.Dragon,
  },
];
