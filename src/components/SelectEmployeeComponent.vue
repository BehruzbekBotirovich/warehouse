<script setup>
import { ref, computed } from 'vue'
import useProjectsStore from '@/store/projects.pinia.js'
import defaultAvatar from '/src/assets/images/def_ava.png'

const props = defineProps({
    projectId: {
        type: String,
        required: true
    }
})

const projectsStore = useProjectsStore()

// Подключаем список участников проекта
const members = computed(() => projectsStore.project_members)

// Массив выбранных пользователей
const selectedEmployees = ref([]) // Мульти-селект
</script>

<template>
    <!-- Мульти-селект для выбора сотрудников -->
    <a-select v-model:value="selectedEmployees" mode="multiple" placeholder="Select employees" style="width: 300px"
        option-label-prop="fullName" option-value-prop="_id" show-arrow tag-render="custom"
        :dropdownRender="dropdownRender">
        <a-select-option v-for="member in members" :key="member._id" :value="member._id">
            <div class="flex items-center gap-2">
                <img class="w-8 h-8 rounded-full object-cover"
                    :src="`http://localhost:5000/user/avatar/${member.avatarUrl || 'default.png'}`" alt="User photo"
                    crossorigin="anonymous" />
                <span>{{ member.fullName }}</span>
            </div>
        </a-select-option>
    </a-select>

    <!-- Отображение выбранных сотрудников -->
    <div class="flex gap-2 mt-4">
        <div v-for="(selected, index) in selectedEmployees" :key="index" class="flex items-center gap-2">
            <img class="w-8 h-8 rounded-full object-cover"
                :src="`http://localhost:5000/user/avatar/${selected.avatarUrl || 'default.png'}`" alt="User photo"
                crossorigin="anonymous" />
            <span>{{ selected.fullName }}</span>
        </div>
    </div>
</template>

<style scoped>
/* Стили для выбранных элементов в мульти-селекте */
.ant-select-selector {
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #d9d9d9;
}

.ant-select-selection-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 10px;
    border-radius: 6px;
}

.ant-select-dropdown {
    max-height: 300px;
    overflow-y: auto;
}

/* Стили для аватаров и текста в списке */
.ant-select-item-option-content {
    display: flex;
    align-items: center;
    gap: 8px;
}

.ant-select-item-option {
    display: flex;
    align-items: center;
    padding: 8px;
}

.ant-select-item-option-selected {
    background-color: #f0f9ff !important;
}
</style>
