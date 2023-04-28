import Vue from "vue";
import Router from "vue-router";
import HomePage from "../components/HomePage";
import ReportsPage from "../components/ReportsPage";
import ProfilePage from "../components/ProfilePage";
import SigninPage from "../components/SigninPage";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/reports",
      name: "reports",
      component: ReportsPage,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
    },
    {
      path: "/signin",
      name: "signin",
      component: SigninPage,
    },
  ],
});

export default router;
