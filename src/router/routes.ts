import Layout from "@/layout/index.vue";
import SubLayout from "@/layout/sub.vue";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "主页"
        }
      },
      {
        path: "tools",
        name: "Tools",
        component: () => import("@/views/tools/index.vue"),
        meta: {
          title: "工具"
        }
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "设置",
          noCache: true
        }
      }
    ]
  },
  {
    path: "/setting",
    name: "setting",
    component: SubLayout,
    redirect: { name: "Setting-site" },
    children: [
      {
        path: "site",
        name: "Setting-site",
        component: () => import("@/views/about/site.vue"),
        meta: {
          title: "地址维护"
        }
      },
      {
        path: "site-view",
        name: "Setting-site-view",
        component: () => import("@/views/about/site-view.vue"),
        meta: {
          title: "地址查看"
        }
      },

      {
        path: "category",
        name: "Setting-category",
        component: () => import("@/views/about/category.vue"),
        meta: {
          title: "类目维护"
        }
      },
      {
        path: "category-view",
        name: "Setting-category-view",
        component: () => import("@/views/about/category-view.vue"),
        meta: {
          title: "类目查看"
        }
      }
    ]
  }
];

export default routes;
