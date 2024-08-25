<template>
  <div
    class="min-w-[1024px] pt-[70px] p-5 justify-center bg-main-bg"
  >
    <Breadcrumb :items="layout.breadcrumbs" />
    <RouterView />
  </div>

  <div class="nav_top flex items-center">
    <div
      class="w-[200px] h-full flex items-center gap-2 px-5"
      @click="router.push('/')"
    >
      <h1 class="cursor-pointer text-[1em]">POC</h1>
    </div>
    <div class="grow h-full flex" v-if="auth.appToken != ''">
      <div class="flex flex-col pl-2">
        <div class="pt-2">{{ auth.appData.DisplayName }}</div>
        <div class="text-[10px] text-slate-300">
          {{ auth.appData.TenantName }}
        </div>
      </div>
    </div>
    <div v-else class="grow h-full flex flex-col px-2 bg-primary">&nbsp;</div>
    <div class="mr-3">
      <UserContextMenu />
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { authStore } from "@/stores/auth";
import { layoutStore } from "@/stores/layout";
import UserContextMenu from "./widgets/UserContextMenu.vue";
import { reactive, onMounted, inject, computed, watch } from "vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import appMenu from "@/data/appmenu";

const router = useRouter();
const route = useRoute();
const auth = authStore();
const layout = layoutStore();
const axios = inject("axios");

const data = reactive({
  menuType: "full",
  menuMasters: [],
});

function changeMenuType() {
  switch (data.menuType) {
    case "full":
      data.menuType = "mini";
      break;

    case "mini":
      data.menuType = "hide";
      break;

    default:
      data.menuType = "full";
  }
}

function generateBreadcrumb(url) {
  const breadcrumb = [];
  function findPath(menu, url) {
    for (const item of menu) {
      if (item.url && item.url == url) {
        breadcrumb.push({ Text: item.label });
        return true;
      } else if (item.submenu) {
        for (const submenu of item.submenu) {
          if (findPath(submenu, url)) {
            if (item.label != "Home") {
              breadcrumb.push({ Text: item.label });
            }
            return true;
          }
        }
      }
    }
    return false;
  }
  findPath(appMenu, url);
  layout.setBreadCrumbs(breadcrumb.reverse());
}

const addDataMaster = computed({
  get() {
    return layout.addDataMaster;
  },
});

async function fetchMenuMasters() {
  data.menuMasters = [];
}

async function updateMasterDataSubmenu() {
  await fetchMenuMasters();
  generateBreadcrumb(route.fullPath);
}

watch(
  route,
  (to) => {
    generateBreadcrumb(to.fullPath);
  },
  { flush: "pre", immediate: true, deep: true }
);

watch(
  addDataMaster,
  (add) => {
    if (add) {
      init();
    }
  },
  { flush: "pre", immediate: true, deep: true }
);

function init() {
  if (auth.appToken == "") {
    //return router.push("/sign/in");
  }
  updateMasterDataSubmenu();
}

onMounted(async () => {
  init();
});
</script>

<style>
.nav_top {
  @apply z-[999] fixed w-[100%] h-[50px] text-white bg-primary;
  width: 100%;
}

.nav_left {
  @apply fixed h-full top-[50px] bg-primary;
}

.nav_right_btn {
  @apply text-white hover:opacity-50 cursor-pointer;
}
</style>
