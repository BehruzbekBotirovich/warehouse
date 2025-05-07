<!-- InventoryFlowChart.vue -->
<template>
  <v-chart class="w-full h-[400px]" :option="options" autoresize />
</template>

<script setup>
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { SankeyChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, SankeyChart, TooltipComponent, TitleComponent])

const options = {
  title: { text: 'Inventory Movement Landscape', left: 'center' },
  tooltip: { trigger: 'item', triggerOn: 'mousemove' },
  series: {
    type: 'sankey',
    layout: 'none',
    nodeWidth: 20,
    nodeGap: 20,
    label: {
      color: '#333',
      fontWeight: 'bold'
    },
    lineStyle: {
      color: 'gradient',
      opacity: 0.6
    },
    data: [
      { name: '365 Smoke and Vape (Austin)' },
      { name: '365 Smoke and Vape (Crosby)' },
      { name: '365 Smoke and Vape (Malibu)' },
      { name: '365 Smoke and Vape (Muscat)' },
      { name: '365 Smoke and Vape (Cranbury)' },
      { name: 'Warehouse' },
      { name: '365 Smoke and Vape (Baytown)' },
      { name: '365 Smoke and Vape (Kirby)' },
      { name: '365 Smoke and Vape (Irving)' },
      { name: '365 Smoke and Vape (Huston)' }
    ],
    links: [
      {
        source: '365 Smoke and Vape (Austin)',
        target: 'Warehouse',
        value: 59.7
      },
      { source: '365 Smoke and Vape (Crosby)', target: 'Warehouse', value: 13 },
      {
        source: '365 Smoke and Vape (Malibu)',
        target: 'Warehouse',
        value: 12.7
      },
      {
        source: '365 Smoke and Vape (Muscat)',
        target: 'Warehouse',
        value: 7.3
      },
      {
        source: '365 Smoke and Vape (Cranbury)',
        target: 'Warehouse',
        value: 5.2
      },
      {
        source: 'Warehouse',
        target: '365 Smoke and Vape (Baytown)',
        value: 13.9
      },
      { source: 'Warehouse', target: '365 Smoke and Vape (Kirby)', value: 2.6 },
      { source: 'Warehouse', target: '365 Smoke and Vape (Kirby)', value: 1.8 },
      {
        source: 'Warehouse',
        target: '365 Smoke and Vape (Irving)',
        value: 1.3
      },
      { source: 'Warehouse', target: '365 Smoke and Vape (Huston)', value: 4 }
    ],
    emphasis: { focus: 'adjacency' },
    nodeAlign: 'justify'
  }
}
</script>
