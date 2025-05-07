<template>
  <div class="bg-white rounded-2xl p-4 shadow">
    <h2 class="font-semibold mb-2">Top Moving Category</h2>
    <apexchart width="100%" type="donut" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup>
const series = [30, 25, 20, 15, 10]
const chartOptions = {
  labels: ['E-Vapes', 'Cigars', 'Batteries', 'Accessories', 'Pipes'],
  legend: { position: 'bottom' }
}
</script>
