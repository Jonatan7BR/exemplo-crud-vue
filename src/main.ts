import { createApp } from "vue";
import AppVue from "./App.vue";
import router from "./router";

import './style.scss';
import { createPinia } from "pinia";

const app = createApp(AppVue);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');
