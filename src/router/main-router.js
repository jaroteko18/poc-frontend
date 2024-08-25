import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from "@/stores/auth";
import { layoutStore } from "@/stores/layout";
import { routes } from 'vue-auto-route';
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[...routes, 
    { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("@/views/404.vue") },
    //{ path: "/channel/:cid", name: "channelViewer", component: () => import("@/views/viewer/ChannelViewer.vue") },
    //{ path: "/billing/:bid", name: "billingViewer", component: () => import("@/views/viewer/BillingViewer.vue") },
  ],
})

export default router

