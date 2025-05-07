<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <MetricCard title="Average Order Volume" value="$208" :trend="12" />
    <MetricCard title="Transaction Count (Orders)" value="100" :trend="-2" />
    <MetricCard title="Products Sold" value="270" :trend="2" />
    <MetricCard title="Gross Profit Margin" value="69.10%" :trend="12" />
    <MetricCard title="Gross Profit" value="$26.4k" :trend="-2" />
    <MetricCard title="Total Net Revenue" value="$1.8m" :trend="2" />
  </div>
</template>

<script setup>
import MetricCard from './MetricsCard.vue'
</script>
