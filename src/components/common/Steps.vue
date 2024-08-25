<template>
    <div class="flex">
        <div v-for="(step, index) in steps" class="flex">
            <div class="flex flex-col gap-2 w-[40px] justify-center">
                <div 
                    class="h-[40px] rounded-full flex items-center justify-center align-middle cursor-pointer"
                    :class="{'bg-primary text-white':index+1 <= selected, 'bg-slate-300 hover:bg-secondary':index+1 > selected}"
                    @click="onSelect(index+1)"
                >
                    <div v-if="step.icon==''">
                        {{  index + 1 }}
                    </div>
                    <div v-else>
                        <mdicon :name="step.icon" />
                    </div>
                </div>
                <div>{{ step.label }}</div> 
            </div>
            <div
                v-if="index < (steps.length-1)" 
                class="w-[80px] border-b-[4px] h-[22px]"
                :class="{'border-slate-300': index+1 >= selected, 'border-primary': index+1 < selected }"
            ></div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    steps: { type: Array, default: () => 
        [
            {label:"Registration", icon:"file-document-outline"},
            {label:"Approval", icon:"check-bold"},
            {label:"Activation", icon:"account-reactivate"}
        ]
    },
    selected: { type: Number, default: 1},
})

const emits = defineEmits({'select':null})

function onSelect(index) {
    emits('select', index);
}

</script>