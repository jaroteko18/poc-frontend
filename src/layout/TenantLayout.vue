<template>
  <div
    class="w-full pt-[70px] p-5 justify-center bg-main-bg"
    :class="[
      data.menuType == 'full'
        ? 'ml-[200px]'
        : data.menuType == 'mini'
        ? 'ml-[50px]'
        : '',
    ]"
  >
    <Breadcrumb :items="layout.breadcrumbs" />
    <RouterView />
  </div>

  <div class="nav_top flex items-center">
    <div
      class="w-[200px] h-full flex items-center justify-center gap-2 px-2 bg-tersiary text-white"
      v-if="data.menuType == 'full'"
      @click="changeMenuType()"
    >
      <mdicon name="menu" class="cursor-pointer" width="18" />
      <h1 class="cursor-pointer text-[1em]">POC@2024</h1>
    </div>
    <div
      v-else
      class="w-[50px] h-full flex items-center justify-center px-4 bg-tersiary text-white cursor-pointer"
      @click="changeMenuType()"
    >
      <h1 class="text-[1em]">BS</h1>
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

  <div
    v-if="data.menuType != 'hide'"
    class="nav_left flex-col gap-1 text-slate-100"
    :class="[data.menuType == 'full' ? 'w-[200px]' : 'w-[50px]']"
  >
    <div class="flex flex-col mt-4">
      <context-menu
        as="div"
        v-for="menu in appMenu"
        class="w-full px-4 py-2 cursor-pointer hover:bg-nav-title-b"
        :icon="menu.icon"
        :label="menu.label"
        :url="menu.url"
        :submenu="menu.submenu"
        :view-type="data.menuType"
      />
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
import ContextMenu from "@/components/common/ContextMenu.vue";
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
  try {
    const r = await axios.post("/tenant/masterdata/gets", { Sort: ["Name"] });
    data.menuMasters = r.data.data.map((e) => {
      return {
        label: e.Name,
        url: `/tenant/masterdata?MasterDataID=${e._id}&title=${e.Name}`,
      };
    });
  } catch (e) {
    data.menuMasters = [];
  }
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
