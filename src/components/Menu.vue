<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import moment from 'moment';

const { goto } = defineProps(['goto']);

const date = ref(moment());
setInterval(() => {
    date.value = moment();
}, 1000);
</script>

<template>
    <nav class="fixed top-0 left-0 right-0 z-10">
        <div class="flex flex-row justify-between pt-8 px-10">
            <div class="flex items-center flex-row">
                <RouterLink :to="goto">
                    <div class="h-full aspect-square cursor-pointer">
                        <svg class="h-9" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M54 14H0V10H54V14ZM54 30H0V26H54V30ZM0 46H54V42H0V46Z" fill="white" />
                        </svg>
                    </div>
                </RouterLink>
                <div class="flex flex-row items-center ml-6">
                    <img src="../assets/icon.png" class="h-9">
                    <p class="text-white text-4xl ml-3">Runpier</p>
                </div>
            </div>
            <div class="text-4xl font-light flex items-center">{{ date.format("HH:mm") }}</div>
        </div>
    </nav>
</template>

<style scoped></style>