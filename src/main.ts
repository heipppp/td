import { createApp } from "vue";
import { store } from "./store";
// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "./styles/index.less";
// tailwindcss
import "./styles/tailwind.css";
// vant样式丢失
import "vant/lib/index.css";
// svg icon
import "virtual:svg-icons-register";

import App from "./App.vue";
import router from "./router";

import "./initialize";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
