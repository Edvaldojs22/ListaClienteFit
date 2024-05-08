
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import EditCliente from '../views/EditCliente.vue';


const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/', 
        name: 'Login',
        component: Login
    },
    {
        path: '/editar/:id',
        name: 'editarCliente',
        component: EditCliente
    }
 
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;