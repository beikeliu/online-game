import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VConsole from 'vconsole';

const vConsole = new VConsole();
vConsole.setSwitchPosition(0, 300);


const app = createApp(App);
app.mount('#app');
