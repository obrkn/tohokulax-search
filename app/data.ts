import { ListItem } from "./page";
import ameblo_tohokulax_08 from "@/public/ameblo_tohokulax08/2008.json";
import ameblo_tohokulax_09 from "@/public/ameblo_tohokulax08/2009.json";
import ameblo_tohokulax_10 from "@/public/ameblo_tohokulax08/2010.json";
import ameblo_tohokulax_11 from "@/public/ameblo_tohokulax08/2011.json";
import ameblo_tohokulax_12 from "@/public/ameblo_tohokulax08/2012.json";
import ameblo_tohokulax_13 from "@/public/ameblo_tohokulax08/2013.json";
import ameblo_tohokulax_14 from "@/public/ameblo_tohokulax08/2014.json";
import ameblo_tohokulax_15 from "@/public/ameblo_tohokulax08/2015.json";
import ameblo_tohokulax_16 from "@/public/ameblo_tohokulax08/2016.json";
import ameblo_tohokulax_17 from "@/public/ameblo_tohokulax08/2017.json";
import ameblo_tohokulax_18 from "@/public/ameblo_tohokulax08/2018.json";
import ameblo_tohokulax_19 from "@/public/ameblo_tohokulax08/2019.json";
import ameblo_tohokulax_20 from "@/public/ameblo_tohokulax08/2020.json";
import ameblo_tohokulax_21 from "@/public/ameblo_tohokulax08/2021.json";
import ameblo_tohokulax_22 from "@/public/ameblo_tohokulax08/2022.json";
import ameblo_tohokulax_23 from "@/public/ameblo_tohokulax08/2023.json";
import ameblo_humblers_10 from "@/public/ameblo_humblers/2010.json";
import ameblo_humblers_11 from "@/public/ameblo_humblers/2011.json";
import ameblo_humblers_12 from "@/public/ameblo_humblers/2012.json";
import ameblo_humblers_13 from "@/public/ameblo_humblers/2013.json";
import ameblo_humblers_14 from "@/public/ameblo_humblers/2014.json";
import ameblo_humblers_15 from "@/public/ameblo_humblers/2015.json";
import ameblo_humblers_16 from "@/public/ameblo_humblers/2016.json";
import ameblo_humblers_17 from "@/public/ameblo_humblers/2017.json";
import ameblo_humblers_18 from "@/public/ameblo_humblers/2018.json";
import ameblo_humblers_19 from "@/public/ameblo_humblers/2019.json";
import ameblo_humblers_20 from "@/public/ameblo_humblers/2020.json";
import ameblo_humblers_21 from "@/public/ameblo_humblers/2021.json";
import ameblo_humblers_22 from "@/public/ameblo_humblers/2022.json";
import ameblo_humblers_23 from "@/public/ameblo_humblers/2023.json";
import ameblo_tohokulaxmgs_10 from "@/public/ameblo_tohokulaxmgs16/2010.json";
import ameblo_tohokulaxmgs_11 from "@/public/ameblo_tohokulaxmgs16/2011.json";
import ameblo_tohokulaxmgs_12 from "@/public/ameblo_tohokulaxmgs16/2012.json";
import ameblo_tohokulaxmgs_13 from "@/public/ameblo_tohokulaxmgs16/2013.json";
import ameblo_tohokulaxmgs_14 from "@/public/ameblo_tohokulaxmgs16/2014.json";
import ameblo_tohokulaxmgs_15 from "@/public/ameblo_tohokulaxmgs16/2015.json";
import ameblo_tohokulaxmgs_16 from "@/public/ameblo_tohokulaxmgs16/2016.json";
import ameblo_tohokulaxmgs_17 from "@/public/ameblo_tohokulaxmgs16/2017.json";
import ameblo_tohokulaxmgs_18 from "@/public/ameblo_tohokulaxmgs16/2018.json";
import ameblo_tohokulaxmgs_19 from "@/public/ameblo_tohokulaxmgs16/2019.json";
import livdoor_jolax_data from "@/public/livedoor_jolax.json";

export const ameblo_tohokulax_data: ListItem[] = [
  ...ameblo_tohokulax_23,
  ...ameblo_tohokulax_22,
  ...ameblo_tohokulax_21,
  ...ameblo_tohokulax_20,
  ...ameblo_tohokulax_19,
  ...ameblo_tohokulax_18,
  ...ameblo_tohokulax_17,
  ...ameblo_tohokulax_16,
  ...ameblo_tohokulax_15,
  ...ameblo_tohokulax_14,
  ...ameblo_tohokulax_13,
  ...ameblo_tohokulax_12,
  ...ameblo_tohokulax_11,
  ...ameblo_tohokulax_10,
  ...ameblo_tohokulax_09,
  ...ameblo_tohokulax_08,
];

export const ameblo_humblers_data: ListItem[] = [
  ...ameblo_humblers_23,
  ...ameblo_humblers_22,
  ...ameblo_humblers_21,
  ...ameblo_humblers_20,
  ...ameblo_humblers_19,
  ...ameblo_humblers_18,
  ...ameblo_humblers_17,
  ...ameblo_humblers_16,
  ...ameblo_humblers_15,
  ...ameblo_humblers_14,
  ...ameblo_humblers_13,
  ...ameblo_humblers_12,
  ...ameblo_humblers_11,
  ...ameblo_humblers_10,
];

export const ameblo_tohokulaxmgs_data: ListItem[] = [
  ...ameblo_tohokulaxmgs_19,
  ...ameblo_tohokulaxmgs_18,
  ...ameblo_tohokulaxmgs_17,
  ...ameblo_tohokulaxmgs_16,
  ...ameblo_tohokulaxmgs_15,
  ...ameblo_tohokulaxmgs_14,
  ...ameblo_tohokulaxmgs_13,
  ...ameblo_tohokulaxmgs_12,
  ...ameblo_tohokulaxmgs_11,
  ...ameblo_tohokulaxmgs_10,
];

const data = [
  ...ameblo_tohokulax_data,
  ...ameblo_humblers_data,
  ...ameblo_tohokulaxmgs_data,
  ...livdoor_jolax_data,
];
export default data;
