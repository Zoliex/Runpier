<script setup>
import { RouterView } from 'vue-router';
import Bg from './components/Bg.vue';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
</script>

<template>
  <main class="font-[Poppins] select-none">
    <Bg />
    <RouterView />
  </main>
</template>