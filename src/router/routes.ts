import { RouteConfig } from "vue-router";
import { user } from "src/store/index";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/usercontrol",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/UserControl.vue") }],
    beforeEnter(to, from, next) {
      if (user.ability.cannot("manage", "allUsers")) {
        next("/account");
      } else {
        next();
      }
    }
  },
  {
    path: "/catalogue",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Catalogue.vue") }]
  },
  {
    path: "/qrscanner",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/QR.vue") }]
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/UserLogin.vue") }],
    beforeEnter(to, from, next) {
      if (user.ability.can("manage", "activeUser")) {
        next("/account");
      } else {
        next();
      }
    }
  },
  {
    path: "/account",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AccountSettings.vue") }
    ],
    beforeEnter(to, from, next) {
      if (user.ability.cannot("manage", "activeUser")) {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
