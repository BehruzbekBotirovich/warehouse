<template>
  <div class="p-4 space-y-6">
    <DashboardHeader />

    <MetricsGrid />

    <div class="bg-white rounded-2xl p-4 shadow">
      <h2 class="text-lg font-semibold mb-4">Monthly Sales Vs Inventory Analysis</h2>
      <SalesInventoryChart />
    </div>

    <div class="bg-white rounded-2xl p-4 shadow">
      <InventoryFlowChart />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TopCategoryDonut />
      <MostSoldProductsBar />
    </div>
  </div>
</template>

<script setup>
import DashboardHeader from './components/DashboardHeader.vue'
import MetricsGrid from './components/MetricsGrid.vue'
import SalesInventoryChart from './components/SalesInventoryChart.vue'
import InventoryFlowChart from './components/InventoryFlowChart.vue'
import TopCategoryDonut from './components/TopCategoryDonut.vue'
import MostSoldProductsBar from './components/MostSoldProductsBar.vue'
</script>
