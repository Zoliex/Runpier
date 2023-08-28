<script setup>
import axios from 'axios';
import { ref } from 'vue';

import Menu from '@/components/Menu.vue';
import SystemCard from '@/components/SystemCard.vue';
import SystemUtilsCards from '../components/SystemUtilsCards.vue';

const system = ref(
    {
        fan: {
            value: 0,
            valuePrct: 0,
            unit: "rpm"
        },
        cpu: {
            value: 0,
            valuePrct: 0,
            unit: "%"
        },
        disk: {
            value: 0,
            valuePrct: 0,
            unit: "Gb"
        },
        ram: {
            value: 0,
            valuePrct: 0,
            unit: "Gb"
        },
        temp: {
            value: 0,
            valuePrct: 0,
            unit: "°C"
        }
    });

const updateData = async () => {
    axios.get('/api/system').then((response) => {
        system.value = response.data;
    });
}
updateData();

setInterval(updateData, 15000);
</script>

<template>
    <Menu goto="/" />
    <main class="absolute top-0 bottom-0 left-0 right-0 flex justify-center">
        <div class="py-28 max-w-4xl h-full flex md:items-center flex-wrap justify-center">
            <SystemCard title="Ventilateur" :value="system.fan.value" :unit="system.fan.unit"
                :valuePrct="system.fan.valuePrct" />
            <SystemCard title="Processeur" :value="system.cpu.value.toFixed(1)" :unit="system.cpu.unit"
                :valuePrct="system.cpu.valuePrct" />
            <SystemCard title="Disque (Boot)" :value="system.disk.value.toFixed(1)" :unit="system.disk.unit"
                :valuePrct="system.disk.valuePrct" />
            <SystemCard title="Ram" :value="system.ram.value.toFixed(1)" :unit="system.ram.unit"
                :valuePrct="system.ram.valuePrct" />
            <SystemCard title="Température" :value="system.temp.value" :unit="system.temp.unit"
                :valuePrct="system.temp.valuePrct" />
            <SystemUtilsCards />
        </div>
    </main>
</template>

<style scoped></style>
