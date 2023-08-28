<script setup>
import { ref } from 'vue';
import axios from 'axios';

function shutdown() {
    axios.get('/api/shutdown');
}

function reboot() {
    axios.get('/api/reboot');
}
</script>

<template>
    <div class="w-60 m-3 aspect-square flex flex-rox justify-between items-start">
        <div @click="shutdown"
            class="w-28 aspect-square bg-red-700 hover:bg-red-800 transition-colors rounded-3xl relative flex items-center justify-center cursor-pointer">
            <svg class="w-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M73.8282 21.0938C78.1029 24.601 81.5464 29.0129 83.9106 34.0114C86.2748 39.0099 87.5007 44.4706 87.5 50C87.5 70.7031 70.7032 87.5 50 87.5C29.2969 87.5 12.5 70.7031 12.5 50C12.4836 44.4874 13.6828 39.0391 16.0121 34.0428C18.3415 29.0465 21.7437 24.6252 25.9766 21.0938M50 12.5V50"
                    stroke="white" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
        <div @click="reboot"
            class="w-28 aspect-square bg-orange-700 hover:bg-orange-800 transition-colors rounded-3xl relative flex items-center justify-center cursor-pointer">
            <svg class="w-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M62.5 25.5156C62.5 25.5156 67.2578 23.1719 50 23.1719C43.8193 23.1719 37.7775 25.0047 32.6384 28.4384C27.4994 31.8722 23.494 36.7528 21.1288 42.463C18.7635 48.1732 18.1447 54.4565 19.3505 60.5184C20.5563 66.5804 23.5325 72.1486 27.9029 76.519C32.2733 80.8894 37.8415 83.8656 43.9034 85.0714C49.9653 86.2772 56.2487 85.6584 61.9589 83.2931C67.6691 80.9279 72.5496 76.9225 75.9834 71.7834C79.4172 66.6444 81.25 60.6025 81.25 54.4219"
                    stroke="white" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round" />
                <path d="M50 8.32812L65.625 23.9531L50 39.5781" stroke="white" stroke-width="10" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>

        </div>
    </div>
</template>

<style scoped></style>