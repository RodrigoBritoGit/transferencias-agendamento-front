import { createRouter, createWebHistory } from 'vue-router';
import ListarTransferencias from '../components/listarTransferencia.vue';
import AgendarTransferencia from '../components/agendarTransferencia.vue'; 

const routes = [
  {
    path: '/',
    name: 'ListarTransferencias',
    component: ListarTransferencias
  },
  {
    path: '/agendar',
    name: 'AgendarTransferencia',
    component: AgendarTransferencia
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
