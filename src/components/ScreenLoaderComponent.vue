<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import ScreenLoader from '@/assets/lottie/ScreenLoader.json'

defineProps({
  loading: Boolean
})
</script>

<template>
  <div class="relative w-full h-full">
    <template v-if="loading">
      <div class="loading absolute top-0 left-0 w-full h-full flex-center">
        <vue3-lottie
          :animation-data="ScreenLoader"
          :width="100"
          :height="100"
          :auto-play="true"
        />
      </div>
    </template>
    <slot />
  </div>
</template>

<style scoped lang="scss"></style>
