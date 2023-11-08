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

export interface ColorList {
  border: { [key in Color]: string };
  hoverBorder: { [key in Color]: string };
  text: { [key in Color]: string };
  peerCheckedBorder: { [key in Color]: string };
  bg: { [key in Color]: string };
  bg75: { [key in Color]: string };
  bg25: { [key in Color]: string };
  ringOffset: { [key in Color]: string };
}

export const colorList: ColorList = {
  border: {
    [Color.Violet900]: "border-violet-900",
    [Color.Blue700]: "border-blue-700",
    [Color.Amber700]: "border-amber-700",
    [Color.Pink700]: "border-pink-700",
    [Color.Purple600]: "border-purple-600",
    [Color.Cyan600]: "border-cyan-600",
    [Color.Green800]: "border-green-800",
    [Color.Red500]: "border-red-500",
  },
  hoverBorder: {
    [Color.Violet900]: "hover:border-violet-900",
    [Color.Blue700]: "hover:border-blue-700",
    [Color.Amber700]: "hover:border-amber-700",
    [Color.Pink700]: "hover:border-pink-700",
    [Color.Purple600]: "hover:border-purple-600",
    [Color.Cyan600]: "hover:border-cyan-600",
    [Color.Green800]: "hover:border-green-800",
    [Color.Red500]: "hover:border-red-500",
  },
  text: {
    [Color.Violet900]: "text-violet-900",
    [Color.Blue700]: "text-blue-700",
    [Color.Amber700]: "text-amber-700",
    [Color.Pink700]: "text-pink-700",
    [Color.Purple600]: "text-purple-600",
    [Color.Cyan600]: "text-cyan-600",
    [Color.Green800]: "text-green-800",
    [Color.Red500]: "text-red-500",
  },
  peerCheckedBorder: {
    [Color.Violet900]: "peer-checked:border-violet-900",
    [Color.Blue700]: "peer-checked:border-blue-700",
    [Color.Amber700]: "peer-checked:border-amber-700",
    [Color.Pink700]: "peer-checked:border-pink-700",
    [Color.Purple600]: "peer-checked:border-purple-600",
    [Color.Cyan600]: "peer-checked:border-cyan-600",
    [Color.Green800]: "peer-checked:border-green-800",
    [Color.Red500]: "peer-checked:border-red-500",
  },
  bg: {
    [Color.Violet900]: "bg-violet-900",
    [Color.Blue700]: "bg-blue-700",
    [Color.Amber700]: "bg-amber-700",
    [Color.Pink700]: "bg-pink-700",
    [Color.Purple600]: "bg-purple-600",
    [Color.Cyan600]: "bg-cyan-600",
    [Color.Green800]: "bg-green-800",
    [Color.Red500]: "bg-red-500",
  },
  bg75: {
    [Color.Violet900]: "bg-violet-900/75",
    [Color.Blue700]: "bg-blue-700/75",
    [Color.Amber700]: "bg-amber-700/75",
    [Color.Pink700]: "bg-pink-700/75",
    [Color.Purple600]: "bg-purple-600/75",
    [Color.Cyan600]: "bg-cyan-600/75",
    [Color.Green800]: "bg-green-800/75",
    [Color.Red500]: "bg-red-500/75",
  },
  bg25: {
    [Color.Violet900]: "bg-violet-900/25",
    [Color.Blue700]: "bg-blue-700/25",
    [Color.Amber700]: "bg-amber-700/25",
    [Color.Pink700]: "bg-pink-700/25",
    [Color.Purple600]: "bg-purple-600/25",
    [Color.Cyan600]: "bg-cyan-600/25",
    [Color.Green800]: "bg-green-800/25",
    [Color.Red500]: "bg-red-500/25",
  },
  ringOffset: {
    [Color.Violet900]: "ring-offset-violet-900/25",
    [Color.Blue700]: "ring-offset-blue-700/25",
    [Color.Amber700]: "ring-offset-amber-700/25",
    [Color.Pink700]: "ring-offset-pink-700/25",
    [Color.Purple600]: "ring-offset-purple-600/25",
    [Color.Cyan600]: "ring-offset-cyan-600/25",
    [Color.Green800]: "ring-offset-green-800/25",
    [Color.Red500]: "ring-offset-red-500/25",
  },
};
