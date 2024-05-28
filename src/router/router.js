import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import EditCliente from "../views/EditCliente.vue";
import NovoCliente from "../views/NovoCliente.vue";
import Mensagem from "../views/Mensagem.vue";
import MensagemAniversario from "../views/MensagemAniversario.vue";
import User from "../views/User.vue";
import { isTokenExpired } from "../api/api";

const routes = [
  {
    path: "/Home",
    name: "home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/Editar/:id",
    name: "editarCliente",
    component: EditCliente,
    meta: { requiresAuth: true },
  },

  {
    path: "/Novo",
    name: "novoCliente",
    component: NovoCliente,
    meta: { requiresAuth: true },
  },

  {
    path: "/Mesagem",
    name: "mensagem",
    component: Mensagem,
    meta: { requiresAuth: true },
  },
  {
    path: "/MesagemAniversario",
    name: "mensagemAniversario",
    component: MensagemAniversario,
    meta: { requiresAuth: true },
  },
  {
    path: "/User",
    name: "user",
    component: User,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token && !isTokenExpired(token);
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next("/");
  } else if (to.name === "login" && isAuthenticated) {
    next("/home");
  } else {
    next();
  }
});

export default router;
