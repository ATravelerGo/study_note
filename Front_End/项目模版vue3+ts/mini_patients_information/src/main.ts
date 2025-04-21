import { createApp } from 'vue';
import 'normalize.css';
import './styles/global.css';
import './styles/tailwind.css';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
