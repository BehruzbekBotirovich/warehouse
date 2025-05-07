<template>
    <div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="field in editableFields" :key="field.key">
                <p class="text-gray-500 text-sm">{{ field.label }}</p>

                <a-input v-if="field.component === 'a-input'" v-model:value="profile[field.key]" :disabled="!isEditing"
                    :placeholder="field.label" />

                <a-select v-else-if="field.component === 'a-select'" v-model:value="profile[field.key]"
                    :options="field.options" :disabled="!isEditing" class="w-full" :placeholder="field.label" />

                <a-date-picker v-else-if="field.component === 'a-date-picker'" v-model:value="profile[field.key]"
                    :disabled="!isEditing" class="w-full" format="YYYY-MM-DD" :placeholder="field.label" />
            </div>
        </div>

        <div class="flex justify-end mt-6 gap-2">
            <template v-if="isEditing">
                <a-button @click="cancelEdit">Отмена</a-button>
                <a-button type="primary" @click="saveChanges">Сохранить</a-button>
            </template>
            <template v-else>
                <a-button type="primary" @click="isEditing = true">Редактировать</a-button>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import useUser from '@/store/user.pinia.js'

const userStore = useUser()
const isEditing = ref(false)

const profile = reactive({
    firstName: userStore.user?.fullName?.split(' ')[0] || '',
    lastName: userStore.user?.fullName?.split(' ')[1] || '',
    patronymic: userStore.user?.fullName?.split(' ')[2] || '',
    role: userStore.user?.role || 'user',
    department: userStore.user?.department || '',
    email: userStore.user?.email || '',
    // birthDate: dayjs(userStore.user?.birthDate).format('YYYY-MM-DD') || '',
    phone: userStore.user?.phone || '',
    passport: userStore.user?.passportSeries || '',
})

// Поля, которые редактируются
const editableFields = [
    { label: 'Имя', key: 'firstName', component: 'a-input' },
    { label: 'Фамилия', key: 'lastName', component: 'a-input' },
    { label: 'Отчество', key: 'patronymic', component: 'a-input' },
    { label: 'Специалность', key: 'department', component: 'a-input' },
    { label: 'Роль', key: 'role', component: 'a-input' },
    { label: 'Дата рождения', key: 'birthDate', component: 'a-date-picker' },
    { label: 'Телефон', key: 'phone', component: 'a-input' },
    { label: 'Почта', key: 'email', component: 'a-input' },
    { label: 'Паспорт', key: 'passport', component: 'a-input' },
]

const backup = reactive({ ...profile })

// Логика
const saveChanges = () => {
    userStore.updateMe({
        fullName: `${profile.firstName} ${profile.lastName} ${profile.patronymic}`,
        role: profile.role,
        email: profile.email,
        department: profile.department,
        birthDate: profile.birthDate,
        phone: profile.phone,
        passportSeries: profile.passport,
    })
}

const cancelEdit = () => {
    isEditing.value = false
    Object.assign(profile, backup)
}
</script>

<style scoped>
.ant-tag {
    user-select: none;
    transition: all 0.2s;
}
</style>