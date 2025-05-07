<script setup>
import AvatarComponent from '@/components/AvatarComponent.vue'
import IconSettings from '@/components/icons/IconSettings.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <a-dropdown trigger="click">
    <div class="flex gap-2 items-center cursor-pointer">
      <div>
        <avatar-component :name="user?.fullName" />
      </div>
      <div class="flex flex-col justify-center">
        <h3 class="text-base font-semibold m-0 leading-[18px]">
          {{ user?.fullName }}
        </h3>
        <p class="text-sm font-medium text-muted m-0 leading-[16px]">
          {{ user?.department }}, {{ user?.role}}
        </p>
      </div>
      <div></div>
    </div>
  </a-dropdown>
</template>

<style scoped lang="scss"></style>
