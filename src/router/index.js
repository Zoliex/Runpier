import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SystemView from "../views/SystemView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/system",
      name: "system",
      component: SystemView,
    },
  ],
});

export default router;
