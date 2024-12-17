import { defineClientConfig } from "vuepress/client";
import Gallery from "./components/Gallery.vue";

export default defineClientConfig({
    enhance: ({ app, router, siteData }) => {
        app.component("Gallery", Gallery);
    },
});