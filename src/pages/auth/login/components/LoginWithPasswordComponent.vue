<script setup>
import { reactive, ref } from 'vue'
import { useValidator } from '@/composables/index.js'
import useAuth from '@/store/auth.pinia.js'
import useCore from '@/store/core.pinia.js'
import { useI18n } from 'vue-i18n'

const { requiredField, emailValidator } = useValidator()
const { t } = useI18n()
const coreStore = useCore()
const authStore = useAuth()

const formRef = ref()
const form = reactive({
    email: '',
    password: ''
})

function submitForm() {
    formRef.value
        .validate()
        .then((valid) => {
            authStore.loginWithPassword({ ...form })
        })
        .catch(() => { })
}
</script>
<template>
    <a-card class="w-[460px] border-none">
        <a-form ref="formRef" :model="form">
            <a-form-item :rules="[emailValidator]" name="email" label="email">
                <a-input size="large" v-model:value="form.email" />
            </a-form-item>

            <a-form-item :rules="[requiredField]" name="password" :label="$t('auth_view.password')">
                <a-input-password autocomplete="off" size="large" v-model:value="form.password" />
            </a-form-item>
        </a-form>

        <div class="flex justify-end items-center gap-2 mt-4">
            <a-button type="text" size="large" class="text-primary">
                {{ t('auth_view.reset_password') }}
            </a-button>
            <a-button @click="submitForm" :loading="coreStore.isLoading('get-token')" size="large" type="primary"
                class="!px-8 text-lg">
                {{ t('auth_view.login') }}
            </a-button>
        </div>

        <!-- <div class="w-full flex justify-between mt-4 text-base">
            <span>{{ t('auth_view.no_account') }}</span>
            <router-link to="/auth/register" class="text-primary underline text-base">
                {{ t('auth_view.register') }}
            </router-link>
        </div> -->
    </a-card>
</template>

<style scoped lang="scss"></style>
