import Layout from "@/layout/index.vue";
import SubLayout from "@/layout/sub.vue";
import type { RouteRecordRaw } from "vue-router";

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
        component: () => import("@/views/home/index.vue"),
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
        path: "content",
        name: "Content",
        component: () => import("@/views/content/index.vue"),
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
        component: () => import("@/views/content/setting/site.vue"),
        meta: {
          title: "地址维护"
        }
      },
      {
        path: "site-view",
        name: "Setting-site-view",
        component: () => import("@/views/content/view/site-view.vue"),
        meta: {
          title: "地址查看"
        }
      },

      {
        path: "category",
        name: "Setting-category",
        component: () => import("@/views/content/setting/category.vue"),
        meta: {
          title: "类目维护"
        }
      },
      {
        path: "category-view",
        name: "Setting-category-view",
        component: () => import("@/views/content/view/category-view.vue"),
        meta: {
          title: "类目查看"
        }
      }
    ]
  },

  {
    path: "/operate",
    name: "Operate",
    component: SubLayout,
    redirect: { name: "Operate-batch" },
    children: [
      {
        path: "batch",
        name: "Operate-batch",
        component: () => import("@/views/content/operate/batch.vue"),
        meta: {
          title: "批量插入"
        }
      },
      {
        path: "export",
        name: "Operate-export",
        component: () => import("@/views/content/operate/export.vue"),
        meta: {
          title: "导入导出"
        }
      }
    ]
  }
];

export default routes;
