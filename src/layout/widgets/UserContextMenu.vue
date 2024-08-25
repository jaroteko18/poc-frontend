<template>
    <div class="flex gap-1 items-center justify-items-center">
        <Menu as="div" class="relative inline-block text-left">
            <MenuButton class="hover:opacity-30 cursor-pointer">
                <div class="flex gap-1 p-2 items-center justify-items-center">
                    <div class="flex flex-col text-[80%] text-left justify-start">
                        <div>{{ auth.appData?.userID }}</div>
                    </div>
                    <mdicon name="account" v-if="auth.appData?.userID"></mdicon>
                </div>
            </MenuButton>

            <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                    class="origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-secondary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-slate-500">
                    <div class="py-1" v-for="menuDiv in menus">
                        <MenuItem v-slot="{ active }" v-for="menu in menuDiv">
                        <a @click="goto(menu.url)" 
                            :class="[active ? 'bg-tersiary text-gray' : 'text-white', 'cursor-pointer block px-4 py-2']">{{ menu.label }}</a>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '@/stores/auth';

const router = useRouter()
const axios = inject("axios")
const auth = authStore()

const props = defineProps({
    auth: { type: Object, default: () => { } },
})

const menus = ref([
    [
        {label:"Logout", url:()=>{
            auth.clear();
            router.push("/");   
        }}]
])

function goto(destination) {
    if (typeof(destination)=="string") {
        router.push(destination)
    } else if (typeof(destination)=="function") {
        destination()
    }
}

</script>