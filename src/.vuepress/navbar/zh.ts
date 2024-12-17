import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "画廊",    // 菜单项名称
    icon: "file",   // 图标
    link: "/gallery/",
  },
]);
