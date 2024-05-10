
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import EditCliente from '../views/EditCliente.vue';
import NovoCliente from '../views/NovoCliente.vue'


const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/', 
        name: 'login',
        component: Login
    },
    {
        path: '/editar/:id',
        name: 'editarCliente',
        component: EditCliente
    },
 
    {
        path: '/Novo',
        name: 'novoCliente',
        component: NovoCliente
    }
 
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;