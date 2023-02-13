import { createWebHistory, createRouter } from "vue-router";
import About from "../routes/About.vue"
import Course from "../routes/Course.vue"
import Calender from "../routes/Calender.vue"
import Committee from "../routes/Committee.vue"
import Apiary from "../routes/Apiary.vue"
import Recipes from "../routes/Recipes.vue"
import Galleri from "../routes/Galleri.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: About
  },
  {
    path: "/om",
    name: "about",
    component: About,
  },
  {
    path: "/kursus",
    name: "course",
    component: Course,
  },
  {
    path: "/kalender",
    name: "calender",
    component: Calender,
  },
  {
    path: "/bestyrelse",
    name: "committee",
    component: Committee,
  },
  {
    path: "/aaret-i-bigaarden",
    name: "apiary",
    component: Apiary,
  },
  {
    path: "/opskrifter",
    name: "recipes",
    component: Recipes,
  },
  {
    path: "/galleri",
    name: "galleri",
    component: Galleri,
  },
  {
    path: "/:catchAll(.*)",
    component: <div>Side ikke fundet</div>,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;