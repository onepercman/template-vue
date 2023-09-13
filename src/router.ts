import Contact from "@/pages/contact.vue"
import HomePage from "@/pages/home.vue"
import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/contact",
      component: Contact,
    },
  ],
})
