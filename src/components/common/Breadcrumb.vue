<template>
    <nav class="flex mb-3" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li v-for="(item, index) in props.items">
                <div class="flex items-center">
                    <svg v-if="index > 0" class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg>
                    <a href="#"
                    @click="goTo(item.goToRouterReplace)"
                    :class="(item.Active ? ' text-gray-500' : 'text-gray-700') + 'inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-primary'">
                        {{ item.Text }}
                    </a>
                </div>
            </li>
        </ol>
    </nav>
</template>
<script setup>

import router from '@/router/main-router';

const props = defineProps({
    items: { type: Array, default: [] }
})

const goTo = function(goToRouterReplace) {
    if(goToRouterReplace) {
        router.replace(goToRouterReplace)
    }
}
</script>