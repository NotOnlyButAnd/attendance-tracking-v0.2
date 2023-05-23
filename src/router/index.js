import Vue from "vue";
import Router from "vue-router";
import HomePage from "../components/HomePage";
import ReportsPage from "../components/ReportsPage";
import ProfilePage from "../components/ProfilePage";
import SigninPage from "../components/SigninPage";
import LoggedOutPage from "../components/LoggedOutPage";
import ProtectedPage from "../components/ProtectedPage";
import GenerateQR from "../components/GenerateQR";
import store from "../store/index.js";

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
    {
      path: "/loggedout",
      name: "loggedout",
      component: LoggedOutPage,
    },
    {
      path: "/protected",
      name: "protected",
      component: ProtectedPage,
    },
    {
      path: "/generate_qr",
      name: "generate_qr",
      component: GenerateQR,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
