<script setup>
import { computed, ref } from 'vue'
import useProjectsStore from '@/store/projects.pinia.js'
import defaultAvatar from '/src/assets/images/def_ava.png'
import SelectEmployeeComponent from './SelectEmployeeComponent.vue'

const props = defineProps({
    projectId: {
        type: String,
        required: true
    }
})

const projectsStore = useProjectsStore()

// Подключаем список участников проекта
const members = computed(() => projectsStore.project_members)

// Логика для выбранных сотрудников
const selectedEmployees = ref([]) // Мульти-селект
</script>

<template>
    <a-table :dataSource="members" :pagination="false" rowKey="_id">
        <a-table-column title="F.I.SH">
            <template #default="{ record }">
                <div class="flex items-center gap-2">
                    <img class="w-10 h-10 rounded-full object-cover border"
                        :src="`http://localhost:5000/user/avatar/` + record?.avatarUrl" alt="User photo"
                        crossorigin="anonymous" />
                    <span>{{ record.fullName }}</span>
                </div>
            </template>
        </a-table-column>
        <a-table-column title="Bo‘lim" dataIndex="department" />
        <a-table-column title="Lavozim" dataIndex="position" />
        <a-table-column title="Roli" dataIndex="role" />
    </a-table>

    <select-employee-component />
    
</template>

<style scoped>
/* Улучшенные стили для выбранных элементов в мульти-селекте */
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
</style>
