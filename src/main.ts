import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './router';
import { createPinia } from 'pinia';
// import VConsole from 'vconsole';

// const vConsole = new VConsole();
// vConsole.setSwitchPosition(0, 300);

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
