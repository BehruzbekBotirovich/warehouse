<template>
  <div
    class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
  >
    <div>
      <h1 class="text-2xl font-semibold text-gray-800">Welcome back, Olivia</h1>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <!-- Time Range Buttons -->
      <div class="flex flex-wrap gap-1">
        <a-button
          v-for="range in ranges"
          :key="range"
          size="small"
          :type="selectedRange === range ? 'primary' : 'default'"
          @click="selectRange(range)"
        >
          {{ range }}
        </a-button>
      </div>

      <!-- Add Metrics -->
      <a-button type="default">Add Metrics</a-button>

      <!-- Date Picker -->
      <a-range-picker
        v-model:value="selectedDates"
        :allow-clear="false"
        size=""
      />

      <!-- Filters -->
<!--      <a-button type="default" >Filters</a-button>-->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ranges = ['1d', '7d', '1m', '3m', '6m', '1y', '3y', '5y']
const selectedRange = ref('1d')
const selectedDates = ref([])

const selectRange = (range) => {
  selectedRange.value = range
}
</script>
