<script setup>
import { ref } from 'vue';
const { title, value, unit, valuePrct } = defineProps(['title', 'value', 'unit', 'valuePrct']);
</script>

<template>
    <div
        class="w-60 aspect-square m-3 p-3 pb-4 bg-zinc-900 bg-opacity-60 backdrop:blur-xl rounded-3xl relative flex flex-col justify-between items-center">
        <h1 class="text-white text-3xl">{{ title }}</h1>
        <div class="bg-zinc-900 relative rounded-full aspect-square w-[75%] overflow-clip">
            <div class="absolute bottom-0 w-full bg-purple-700 z-0 transition-all duration-300 ease-in-out"
                :style="{ height: valuePrct + '%' }">
            </div>
            <div class="absolute w-full h-full z-10 flex items-center justify-center flex-col">
                <h1 class="text-5xl">{{ value }}</h1>
                <p class="text-2xl">{{ unit }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>