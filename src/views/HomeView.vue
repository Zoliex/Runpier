<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import Card from '@/components/Card.vue';
import MiniCard from '@/components/MiniCard.vue';
import Menu from '@/components/Menu.vue';

const apps = ref([]);

async function pingUrl(url) {
    try {
        const response = await axios.head(url);
        return response.status === 200 ? 'bg-green-600' : 'bg-red-600';
    } catch (error) {
        return 'bg-red-600';
    }
}

async function updateStatus() {
    for (const app of apps.value) {
        if (app.url) {
            app.status = await pingUrl(app.url);
        } else if (app.apps) {
            for (const subApp of app.apps) {
                if (subApp.url) {
                    subApp.status = await pingUrl(subApp.url);
                }
            }
        }
    }
}

onMounted(() => {
    axios.get('/api/apps').then((response) => {
        apps.value = response.data;
        updateStatus();
    })
        .catch(error => {
            console.error(error);
        });
});
</script>

<template>
    <Menu goto="/system" />
    <main class="absolute top-0 bottom-0 left-0 right-0">
        <div class="py-28 h-full flex md:items-center flex-wrap justify-center">
            <div v-for="app in  apps " :key="app.id">
                <Card v-if="!app.isMini" :img="app.icon" :link="app.url" :status="app.status" :name="app.name" />
                <MiniCard v-if="app.isMini" :img1="app.apps[0].icon" :link1="app.apps[0].url" :status1="app.apps[0].status"
                    :name1="app.apps[0].name" :img2="app.apps[1].icon" :link2="app.apps[1].url"
                    :status2="app.apps[1].status" :name2="app.apps[1].name" />
            </div>
        </div>
    </main>
</template>

<style scoped></style>
