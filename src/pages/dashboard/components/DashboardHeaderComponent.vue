<script setup>
import AvatarComponent from '@/components/AvatarComponent.vue'
import useUser from '@/store/user.pinia.js'
import { storeToRefs } from 'pinia'
import IconLogo from '@/components/icons/IconLogo.vue'
import HeaderUserComponent from '@/pages/dashboard/components/HeaderUserComponent.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconLogOut from '@/components/icons/IconLogOut.vue'
import useCore from '@/store/core.pinia.js'
import IconTranslate from '@/components/icons/IconTranslate.vue'
import TranslateComponent from '@/components/TranslateComponent.vue'
import { ref } from 'vue'
import IconTelegram from '@/components/icons/IconTelegram.vue'

const coreStore = useCore()
const userStore = useUser()
const { user } = storeToRefs(userStore)

const lang = localStorage.getItem('lang') ?? 'uz'
const langObj = ref({
  uz: 'latin',
  ru: 'russian',
  cyr: 'cyrillic',
  en: 'english'
})

function goToTelegram() {
  window.open(`https://t.me/planera_ms_bot`, '_blank')
}

const leaveTelegram = () => {
  userStore.unLinkFromTelegram()
}
</script>

<template>
  <div class="dashboard-header w-full flex justify-end bg-white px-4 py-2">
    <div class="w-full flex justify-between items-center gap-2">
      <div>
        <img width="160" src="@/assets/images/logo2.png" alt="logo" />
      </div>
      <a-dropdown trigger="click">
        <header-user-component :user="user" />
        <template #overlay>
          <a-menu>
            <a-dropdown placement="leftTop">
              <a-menu-item>
                <template #icon>
                  <IconTranslate />
                </template>
                {{ $t('header_component.language') }}
                ({{ $t(`translate_component.${langObj[lang]}`) }})
              </a-menu-item>
              <template #overlay>
                <translate-component />
              </template>
            </a-dropdown>
            <a-menu-item>
              <template #icon>
                <IconSettings />
              </template>
              {{ $t('header_component.settings') }}
            </a-menu-item>
            <a-menu-item @click="goToTelegram">
              <template #icon>
                <IconTelegram />
              </template>
              Telegram bot
            </a-menu-item>
            <a-popconfirm :title="$t('header_component.do_you_want_to_log_out')" :ok-text="$t('header_component.yes')"
              :cancel-text="$t('header_component.no')" placement="bottomRight" @confirm="coreStore.logout()">
              <a-menu-item class="!text-red">
                <template #icon>
                  <IconLogOut />
                </template>
                {{ $t('header_component.logout') }}
              </a-menu-item>
            </a-popconfirm>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-header {
  -webkit-box-shadow: -6px -4px 10px -3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -6px -4px 10px -3px rgba(0, 0, 0, 0.75);
  box-shadow: -6px -4px 10px -3px rgba(0, 0, 0, 0.75);
}
</style>
