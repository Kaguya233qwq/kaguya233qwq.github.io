import { defineUserConfig } from "vuepress";
import { oml2dPlugin } from 'vuepress-plugin-oh-my-live2d';

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

  plugins: [
    oml2dPlugin({
      // 在这里配置选项
      models: [
        {
          path: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/miku/miku.model.json',
          scale: 0.31,
          position: [-10, 50],
          stageStyle: {
            width: 350
          }
        }
      ],
      tips: {
        style: {
          width: 150,
          height: 70
        },
        welcomeTips: {
          message: {
            daybreak: "早上好！一日之计在于晨，美好的一天就要开始了。",
            morning: "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！",
            noon: "中午了，工作了一个上午，现在是午餐时间！",
            afternoon: "午后很容易犯困呢，来杯咖啡吧~",
            dusk: "傍晚了！工作一天幸苦啦~",
            night: "晚上好，今天过得怎么样呢？",
            lateNight: "已经这么晚了呀，早点休息吧，晚安~",
            weeHours: "这么晚还不睡吗？当心熬夜秃头哦！"
          },
        },
      }
    })

    //  ...other plugins
  ]
  

  // Enable it with pwa
  // shouldPrefetch: false,
});
