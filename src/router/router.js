
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import AddCliente from '../views/AddCliente.vue';


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
        path: '/add',
        name: 'AddCliente',
        component: AddCliente
    }
 
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;