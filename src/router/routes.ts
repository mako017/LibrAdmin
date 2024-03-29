import { RouteConfig } from "vue-router";
import { catalogue, user, userControl } from "src/store/index";

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
    path: "/catalogue/:testID?",
    component: () => import("layouts/MainLayout.vue"),
    // props: true,
    children: [
      {
        path: "",
        component: () => import("pages/Catalogue.vue"),
        props: true,
        beforeEnter(to, from, next) {
          catalogue
            .queryCatalogue()
            .then(() => {
              next();
            })
            .catch(err => console.error(err));
        }
      }
    ]
  },
  {
    path: "/qrscanner",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        beforeEnter(to, from, next) {
          void userControl.queryUsers();
          catalogue
            .queryCatalogue()
            .then(() => {
              next();
            })
            .catch(_err => next());
        },
        component: () => import("pages/QR.vue")
      }
    ]
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
