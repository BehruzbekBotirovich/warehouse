<script setup>
import useCore from '@/store/core.pinia.js'
import FlagRussian from '@/components/flags/FlagRussian.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import { storeToRefs } from 'pinia'
import FlagUzbek from '@/components/flags/FlagUzbek.vue'
import FlagEnglish from '@/components/flags/FlagEnglish.vue'
import IconCheck from '@/components/icons/IconCheck.vue'

const corePinia = useCore()
const { locale } = storeToRefs(corePinia)

function handleChangeTranslate(value) {
  corePinia.changeLocale(value)
}
</script>

<template>
  <a-menu class="">
    <a-menu-item @click="handleChangeTranslate('uz')" class="cursor-pointer">
      <template #icon>
        <FlagUzbek />
      </template>
      <div class="dropdown-content flex justify-between items-center ml-2">
        <span class="dropdown-content-title">
          {{ $t('translate_component.latin') }}
        </span>
        <div class="chevron-right-con flex items-center">
          <span
            v-if="locale === 'uz'"
            class="text-primary flex items-center ml-3"
          >
            <span class="!leading-4 text-sm font-medium text-primary">
              <IconCheck />
            </span>
          </span>
        </div>
      </div>
    </a-menu-item>
    <a-menu-item @click="handleChangeTranslate('ru')" class="cursor-pointer">
      <template #icon>
        <FlagRussian />
      </template>
      <div class="dropdown-content flex justify-between items-center ml-2">
        <span class="dropdown-content-title">
          {{ $t('translate_component.russian') }}
        </span>
        <div class="chevron-right-con flex items-center text-sm font-medium">
          <span
            v-if="locale === 'ru'"
            class="text-primary flex items-center mr-3"
          >
            <span class="!leading-4 text-sm font-medium text-primary">
              <IconCheck />
            </span>
          </span>
        </div>
      </div>
    </a-menu-item>
    <a-menu-item @click="handleChangeTranslate('en')" class="cursor-pointer">
      <template #icon>
        <FlagEnglish />
      </template>
      <div class="dropdown-content flex justify-between items-center ml-2">
        <span class="dropdown-content-title">
          {{ $t('translate_component.english') }}
        </span>
        <div class="chevron-right-con flex items-center text-sm font-medium">
          <span
            v-if="locale === 'en'"
            class="text-primary flex items-center mr-3"
          >
            <span class="!leading-4 text-sm font-medium text-primary">
              <IconCheck />
            </span>
          </span>
        </div>
      </div>
    </a-menu-item>
  </a-menu>
</template>

<style scoped lang="scss"></style>
