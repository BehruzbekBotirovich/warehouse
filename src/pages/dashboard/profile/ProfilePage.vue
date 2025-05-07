<template>
  <div class="flex flex-col md:flex-row gap-6 p-6">
    <!-- Левая колонка -->
    <div class="w-fit md:w-1/4 bg-white rounded-lg shadow p-6 h-fit">
      <div class="flex flex-col items-center text-center">
        <div class="relative">
          <img
            class="w-32 h-32 rounded-full object-cover border"
            src="@/assets/images/def_ava.png"
            alt="User photo"
            crossorigin="anonymous"
          />
          <button
            class="absolute bottom-1 right-1 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700"
          >
            <icon-camera />
          </button>
        </div>
        <h2 class="text-xl font-bold mt-4">
          {{ userStore.user?.fullName?.split(' ')[0] || '' }}
          {{ userStore.user?.fullName?.split(' ')[1] || '' }}
          {{ userStore.user?.fullName?.split(' ')[2] || '' }}
        </h2>
        <p class="text-gray-600">
          {{ userStore.user?.department }} {{ userStore.user?.role }}
        </p>

        <div class="mt-4 text-left w-full">
          <p class="text-sm text-gray-600 mt-1">
            Начало работы:
            <strong>{{ userStore?.user?.createdAt.split('T')[0] }}</strong>
          </p>
        </div>
      </div>
    </div>

    <!-- Правая колонка -->
    <div class="w-full md:w-3/4 bg-white rounded-lg shadow p-6">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="main" tab="Мои данные">
          <user-profile-info />
        </a-tab-pane>

        <a-tab-pane key="workbook" tab="Статистика">
          <profile-stat />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import UserProfileInfo from './components/UserProfileInfo.vue'
import ProfileStat from './components/ProfileStat.vue'
import useUser from '../../../store/user.pinia'

const userStore = useUser()
const activeTab = ref('main')
const isEditing = ref(false)

const profile = reactive({
  firstName: userStore.user?.fullName?.split(' ')[0] || '',
  lastName: userStore.user?.fullName?.split(' ')[1] || '',
  patronymic: userStore.user?.fullName?.split(' ')[2] || '',
  photo: '/src/assets/images/for_remove/avatar.png',
  position: 'Дизайнер',
  organization: 'ЦИТ Министерство финансов Республики Узбекистан',
  startDate: '02.02.2022',
  employmentType: 'Полная',
  birthDate: '1995-06-01',
  city: 'г. Ташкент',
  gender: 'Мужской',
  phone: '+99890 924 01 34',
  homePhone: '+99871 924 01 34',
  email: 'info@gmail.com',
  passport: 'AA 2266666'
})

function onEdit() {
  isEditing.value = true
}

function onSave() {
  isEditing.value = false
  // Тут можешь сделать API-запрос на сохранение
  console.log('Сохранено:', profile)
}

function onCancel() {
  isEditing.value = false
}
</script>

<style scoped>
.bi-camera {
  font-size: 14px;
}
</style>
