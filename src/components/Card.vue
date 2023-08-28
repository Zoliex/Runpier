<script setup>
import { ref } from 'vue';
const { img, link, status, name } = defineProps(['img', 'link', 'status', 'name']);
</script>

<template>
    <a :href="link">
        <div class="w-60 aspect-square m-3 bg-zinc-900 bg-opacity-60 hover:bg-opacity-80 transition-colors backdrop:blur-xl rounded-3xl relative flex items-center justify-center"
            :title="name">
            <div class="absolute top-4 right-4 w-7 aspect-square rounded-full" :class="status || 'bg-red-600'"></div>

            <div class="w-44 h-44 flex items-center justify-center">
                <img :src="img" class="object-contain h-full w-full">
            </div>
        </div>
    </a>
</template>

<style scoped></style>