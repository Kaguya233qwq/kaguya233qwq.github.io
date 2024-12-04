import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "沉默的子龙君的博客",
      description: "这是沉默的子龙君的博客",
    },
    "/en/": {
      lang: "en-US",
      title: "Kaguya233qwq's Blog",
      description: "A blog of kaguya233qwq",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
