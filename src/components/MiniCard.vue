<script setup>
import { ref } from 'vue';
const { img1, link1, status1, name1, img2, link2, status2, name2 } = defineProps(['img1', 'link1', 'status1', 'name1']);

</script>

<template>
    <div>
        <a :href="link1">
            <div class="w-28 aspect-square m-3 bg-zinc-900 bg-opacity-60 hover:bg-opacity-80 transition-colors backdrop:blur-xl rounded-3xl relative flex items-center justify-center"
                :title="name1">
                <div class="absolute top-4 right-4 w-4 aspect-square rounded-full" :class="status1 || 'bg-red-600'"></div>

                <div class="w-20 aspect-square flex items-center justify-center">
                    <img :src="img1" class="object-contain h-full w-full">
                </div>
            </div>
        </a>

        <a :href="link2">
            <div class="w-28 aspect-square m-3 bg-opacity-60 hover:bg-opacity-80 transition-colors backdrop:blur-xl rounded-3xl relative flex items-center justify-center"
                :title="name2" :class="{ 'bg-zinc-900': name2 != null }">
                <div v-if="name2 != null" class="absolute top-4 right-4 w-4 aspect-square rounded-full"
                    :class="status2 || 'bg-red-600'"></div>

                <div class="w-20 aspect-square flex items-center justify-center">
                    <img :src="img2" v-if="name2 != null" class="object-contain h-full w-full">
                </div>
            </div>
        </a>
    </div>
</template>

<style scoped></style>