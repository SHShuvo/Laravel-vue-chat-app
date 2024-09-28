import './bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './store/useAuthStore';
import router from './router/router';
import App from './components/App.vue';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia)

const {attempt} = useAuthStore();
attempt().then(()=>{
    app.use(router)
    app.mount('#app');
})
