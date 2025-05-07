<script setup>
import { computed, h, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import IconChevronLeftDouble from '@/components/icons/IconChevronLeftDouble.vue'
import IconChevronRightDouble from '@/components/icons/IconChevronRightDouble.vue'
import navigations from '@/routers/navigations.js'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const coreStore = useCore()

const { collapsed } = storeToRefs(coreStore)

const menuList = navigations
  .filter((item) => item.meta.showMenu)
  .map((item) => ({
    label: t(`menu.${item.name}`),
    name: item.name,
    icon: item.meta.icon,
    key: item.path
  }))

const selectedKeys = computed(() => [
  route.fullPath.split('/')[2].split('?')[0]
])

function navigate({ item }) {
  let query = {}
  if (route.fullPath.split('/')[2] === item.key) {
    query = route.query
  }
  router.push({
    name: item.name,
    query: query
  })
}
</script>

<template>
  <div class="h-full p-2 bg-white rounded-[16px]">
    <div class="flex items-center" :class="[collapsed ? 'justify-center' : 'justify-between']">
      <div v-if="!collapsed">
        <h1 class="font-medium text-sm m-0 px-2 uppercase text-muted">Menu</h1>
      </div>
      <div>
        <a-button @click="coreStore.changeCollapsed()" type="text">
          <template #icon>
            <IconChevronRightDouble v-if="collapsed" class="text-2xl" />
            <IconChevronLeftDouble v-else class="text-2xl" />
          </template>
        </a-button>
      </div>
    </div>
    <div class="flex flex-col gap-[2px] w-full menu">
      <a-menu @click="navigate" :selected-keys="selectedKeys" :items="menuList" :inline-collapsed="collapsed"
        mode="inline" class="ant-menu-custom-class" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';

.menu {
  &:deep(.ant-menu-item) {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;

    .ant-menu-title-content {
      line-height: 18px;
    }

    .ant-menu-item-icon {
      font-size: 20px !important;
    }
  }

  &:deep(.ant-menu-item-selected) {
    background: $primary;
    color: #fff;
  }
}

.settings-menu {
  .setting-border {
    border-top: 1px solid rgb($muted, 1);
  }
}
</style>
