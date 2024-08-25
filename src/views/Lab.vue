<template>
    <div class="flex flex-col card w-full items-center justify-center pt-4">
        <steps :steps="data.steps" :selected="data.selected" @select="onSelect" />

        <div class="mt-4 w-full">aku</div>
    </div>
</template>

<script setup>
import Steps from '@/components/common/Steps.vue'
import { reactive } from 'vue';
import { layoutStore } from '@/stores/layout';

layoutStore().change('evs');
const data = reactive({

    steps: [
            {label:"Registration", icon:"file-document-outline"},
            {label:"Approval", icon:"check-bold"},
            {label:"Activation", icon:"account-reactivate"}
        ]
    ,
    selected: 1,
})

function onSelect(index) {
}

</script>