import { createWebHistory, createRouter } from "vue-router";
import About from "../routes/About.vue"
import Course from "../routes/Course.vue"
import Calender from "../routes/Calender.vue"
import Committeee from "../routes/Committee.vue"
import Apiary from "../routes/Apiary.vue"
import Recipes from "../routes/Recipes.vue"
import Galleri from "../routes/Galleri.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: About
  },
  {
    path: "/om",
    name: "About",
    component: About,
  },
  {
    path: "/kursus",
    name: "Course",
    component: Course,
  },
  {
    path: "/kalender",
    name: "Calender",
    component: Calender,
  },
  {
    path: "/bestyrelse",
    name: "Committeee",
    component: Committeee,
  },
  {
    path: "/aaret-i-bigaarden",
    name: "Apiary",
    component: Apiary,
  },
  {
    path: "/opskrifter",
    name: "Recipes",
    component: Recipes,
  },
  {
    path: "/galleri",
    name: "Galleri",
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