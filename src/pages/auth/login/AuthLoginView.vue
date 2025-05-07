<template>
  <div>
    <h2 class="text-2xl font-bold text-center lg:text-left">
      {{ t('auth_view.sign_in') }}
    </h2>
    <login-with-password-component />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LoginWithPasswordComponent from '@/pages/auth/login/components/LoginWithPasswordComponent.vue'

const { t } = useI18n()
const activeTab = ref("LoginWithEimzoComponent")

const tabs = [
  { label: "E-imzo orqali", value: "LoginWithEimzoComponent" },
  { label: "Telefon raqam orqali", value: "LoginWithPasswordComponent" },
]

// Compute the active component
const activeComponent = computed(() => {
  return activeTab.value === "LoginWithEimzoComponent"
    ? LoginWithEimzoComponent
    : LoginWithPasswordComponent;
});
</script>

<style lang="scss" scoped></style>