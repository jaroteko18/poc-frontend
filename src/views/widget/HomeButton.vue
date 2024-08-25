<template>
    <div class="">
        <div class="homebutton">
            <div class="label">{{  label }}</div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
    label: {type: String, default: ''},
});


const router = useRouter();
</script>

<style scoped>
.homebutton {
    @apply min-w-[150px] min-h-[150px] border-[1px] rounded-md p-[3px] 
        flex flex-col gap-[2px] justify-center items-center cursor-pointer
        hover:bg-tersiary;
}

.homebutton .label {
    @apply font-bold;
}
</style>