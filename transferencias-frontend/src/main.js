import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Listagem from './components/listarTransferencia.vue';
import Agendar from './components/agendarTransferencia.vue';

// Definindo as rotas
const routes = [
  { path: '/', component: Listagem },
  { path: '/agendar', component: Agendar }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);

app.use(router).mount('#app');
