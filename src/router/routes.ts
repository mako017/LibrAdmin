import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") }
    ]
  },
  {
    path: "/usercontrol",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/UserControl.vue") }
    ]
  },
  {
    path: "/catalogue",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Catalogue.vue") }
    ]
  },
  {
    path: "/qrscanner",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/QR.vue") }
    ]
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/UserLogin.vue") }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
