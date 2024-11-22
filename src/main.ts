import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "@unocss/reset/tailwind-compat.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.component("QuillEditor", QuillEditor);
app.mount("#app");
