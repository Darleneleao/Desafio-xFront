import Vue from "vue";
import VueRouter from "vue-router";
import ListaCliente from "../views/ListaCliente.vue";
import ListaVenda from "../views/ListaVenda.vue";
import Relatorios from "../views/Relatorios.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/clientes",
    name: "clientes",
    component: ListaCliente,
  },
  {
    path: "/vendas",
    name: "vendas",
    component: ListaVenda,
  },
  {
    path: "/relatorios",
    name: "relatorios",
    component: Relatorios,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
