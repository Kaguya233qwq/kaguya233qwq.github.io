import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/en/": {
      lang: "en-US",
      title: "Kaguya233qwq's Blog",
      description: "A blog of kaguya233qwq",
    },
    "/": {
      lang: "zh-CN",
      title: "沉默的子龙君的博客",
      description: "这是沉默的子龙君的博客",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
