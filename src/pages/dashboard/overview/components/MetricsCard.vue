<template>
  <div
    class="bg-white rounded-2xl shadow p-4 w-full flex flex-col justify-between"
  >
    <div class="text-gray-500 text-sm">{{ title }}</div>
    <div class="text-2xl font-bold">{{ value }}</div>
    <div
      :class="[
        'text-sm mt-1 flex items-center',
        trend >= 0 ? 'text-green-500' : 'text-red-500'
      ]"
    >
      <span>{{ trend >= 0 ? '↑' : '↓' }} {{ Math.abs(trend) }}% </span>
      <span class="ml-1 text-gray-400">vs last month</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  trend: Number
})
</script>
