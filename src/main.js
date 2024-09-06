/*--基础配置-- */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const app = createApp(App);
const pinia = createPinia();
import './util/axios.config';
app.use(router); // 安装 Vue Router

app.use(pinia); // 安装 Pinia
pinia.use(piniaPluginPersistedstate);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
// 挂载应用
app.mount('#app');
