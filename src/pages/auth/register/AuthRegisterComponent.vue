<script setup>
import { reactive, ref } from 'vue'
import { formatPhoneNumber, reformatPhoneNumber } from '@/helpers/index.js'
import { useValidator } from '@/composables/index.js'
import { useI18n } from 'vue-i18n'
import useAuth from '@/store/auth.pinia.js'
import useCore from '@/store/core.pinia.js'

const { t } = useI18n()
const { requiredField, phoneNumberValidator } = useValidator()

const coreStore = useCore()
const authStore = useAuth()

const formRef = ref()
const form = reactive({
  grantType: 'password',
  username: '',
  email: '',
  password: '',
  password_confirm: ''
})

async function inputTypingEvent() {
  form.username = await formatPhoneNumber(form.username)
}

function submitForm() {
  formRef.value
    .validate()
    .then((valid) => {
      getChallenge((data, error) => {
        if (data) {
          console.log(data)
          eimzoRef.value?.generatePkcs7(data.challenge)
        } else if (error) {
          console.log(error)

          coreStore.switchStatus(error)
        }
      })

        })
    .catch(() => { })
}

// patterns
const passwordPattern = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!?@#$%^&*_\-\+\(\)\[\]\{\}><\/\\|"'.,:;])[A-Za-z\d~!?@#$%^&*_\-\+\(\)\[\]\{\}><\/\\|"'.,:;]{8,}$/
)
const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

// validators
const validatePassword = (rule, value) => {
  if (!value || passwordPattern.test(value)) {
    return Promise.resolve()
  } else {
    return Promise.reject(
      `${t('settings_menu_component.invalid_password')} ~ ! ? @ # $ % ^ & * _ - + ( ) [ ] { } > < / \\ | " ' . , : ;`
    )
  }
}

const validateConfirmPassword = (rule, value) => {
  if (!value) {
    return Promise.reject(t('validations.required_field'))
  } else if (value !== form.password) {
    return Promise.reject('Password not match')
  } else {
    return Promise.resolve()
  }
}

const validateEmail = (rule, value) => {
  if (!value) {
    return Promise.reject(t('validations.required_field'))
  }
  if (!emailPattern.test(value)) {
    return Promise.reject(t('validations.invalid_email'))
  }
  return Promise.resolve()
}
</script>

<template>
  <a-card class="w-[400px] border-none">
    <h2 class="text-xl font-bold text-center lg:text-left">
      {{ $t('auth_view.register') }}
    </h2>
    <a-form ref="formRef" :model="form">

      <a-form-item label="Email" name="email" :rules="[{ required: true }, { validator: validateEmail }]">
        <a-input v-model:value="form.email" />
      </a-form-item>

      <div class="flex gap-2">
        <div class="w-[70px]">
          <a-form-item :label="$t('auth_view.code')">
            <a-input @input="inputTypingEvent" disabled size="large" value="+998" />
          </a-form-item>
        </div>
        <div class="flex-grow">
          <a-form-item :rules="[phoneNumberValidator]" :label="$t('auth_view.phone_number')" name="username">
            <a-input @input="inputTypingEvent" size="large" v-model:value="form.username" />
          </a-form-item>
        </div>
      </div>

      <a-form-item :rules="[
        { required: true, message: '' },
        { validator: validatePassword }
      ]" name="password" :label="$t('auth_view.password')">
        <a-input-password autocomplete="" size="large" v-model:value="form.password" />
      </a-form-item>

      <!-- confirm password  -->
      <a-form-item :rules="[
        { required: true, message: '' },
        { validator: validateConfirmPassword }
      ]" name="password_confirm" :label="$t('auth_view.password_confirm')">
        <a-input-password autocomplete="" size="large" v-model:value="form.password_confirm" />
      </a-form-item>
    </a-form>
    <div class="flex justify-end items-center gap-2 mt-4">
      <a-button @click="submitForm" :loading="coreStore.isLoading('get-token')" size="large" type="primary"
        class="!px-8 w-full">
        {{ t('auth_view.register') }}
      </a-button>
    </div>
    <div class="w-full flex justify-between mt-4">
      <span class="">Agar akkauntingiz bo‘lsa</span>
      <router-link to="/auth/login" class="text-primary underline">Tizimga kirish</router-link>
    </div>
  </a-card>



</template>

<style scoped lang="scss"></style>
