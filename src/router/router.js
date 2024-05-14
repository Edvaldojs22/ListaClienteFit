
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import EditCliente from '../views/EditCliente.vue';
import NovoCliente from '../views/NovoCliente.vue'
import Mensagem from '../views/Mensagem.vue';
import MensagemAniversario from '../views/MensagemAniversario.vue';


const routes = [
    {
        path: '/Home',
        name: 'home',
        component: Home
    },
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/Editar/:id',
        name: 'editarCliente',
        component: EditCliente
    },

    {
        path: '/Novo',
        name: 'novoCliente',
        component: NovoCliente
    },

    {
        path: '/Mesagem',
        name: 'mensagem',
        component: Mensagem
    },
    {
        path: '/MesagemAniversario',
        name: 'mensagemAniversario',
        component: MensagemAniversario
    }


];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;