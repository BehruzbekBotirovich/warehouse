<template>
  <div class="bg-white rounded-2xl p-4 shadow">
    <h2 class="font-semibold mb-2">Most Sold Products</h2>
    <div v-for="item in products" :key="item.name" class="mb-2">
      <div class="text-sm text-gray-700">{{ item.name }}</div>
      <div class="w-full bg-gray-200 rounded h-2">
        <div
          class="bg-purple-500 h-2 rounded"
          :style="{ width: item.value + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = [
  { name: 'Stinzy Vapes', value: 37 },
  { name: 'Aston E-Cig', value: 14 },
  { name: 'Retro-T Joints', value: 50 },
  { name: 'Mikey Handles', value: 50 },
  { name: 'Blue Ribbon', value: 50 },
  { name: 'Foureloko', value: 50 },
  { name: 'Blastboyz', value: 50 },
  { name: 'Cultivator', value: 50 }
]
</script>
