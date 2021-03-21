import { RouteConfig } from "vue-router";
import { Ability } from "@casl/ability";
import { user } from "src/store/index";
import { PermissionManager } from "src/assets/ts/permissionManager";
import { AbilityType } from "src/components/models";

const abilities = new Ability<AbilityType>(
  PermissionManager.initPermissions(user.role)
);

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
      if (abilities.cannot("manage", "allUsers")) {
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
      if (abilities.can("manage", "activeUser")) {
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
      if (abilities.cannot("manage", "activeUser")) {
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
