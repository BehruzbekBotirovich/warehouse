<template>
  <apexchart
    width="100%"
    height="350"
    type="bar"
    :options="chartOptions"
    :series="series"
  />
</template>

<script setup>
import ApexCharts from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'

const series = [
  {
    name: 'Gross Sales Revenue',
    data: [
      300, 320, 310, 350, 370, 400, 390, 360, 380, 400, 420, 430, 440, 460, 470
    ]
  },
  {
    name: 'Transaction Count',
    data: [
      100, 110, 105, 120, 130, 135, 125, 115, 120, 130, 140, 145, 150, 155, 160
    ]
  },
  {
    name: 'Inventory Moved',
    data: [
      200, 210, 220, 250, 260, 270, 255, 245, 250, 265, 275, 280, 290, 300, 310
    ]
  }
]

const chartOptions = {
  chart: {
    type: 'bar',
    stacked: true
  },
  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar'
    ]
  },
  legend: {
    position: 'top'
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
}
</script>
